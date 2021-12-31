import { useState, useContext } from "react";
import { UserContext } from "./userContext";
import { ProjectContext } from './projectContext'
import { useNavigate, Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ListItem from "@mui/material/ListItem";
import QuotesPage from "./quotesPage";
import DetailsPage from "./detailsPage";
import SchedulePage from './schedulePage';
import SchedulePage2 from './schedulePageFrappe';
import { Button } from "reactstrap";
import "./projectsPage.scss";

let Nav = 0;

const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { project } = useContext(ProjectContext);

  const userFromSession = window.sessionStorage.getItem("user");
  const projectFromSession = window.sessionStorage.getItem("project")

  let jUser;
  if (user[0]) {
    jUser = JSON.parse(user);
  } else if (userFromSession) {
    jUser = JSON.parse(userFromSession);
  } else {
    jUser = {
      id: 0,
      name: "",
    };
  }

  let jProject;
  if (project[0]) {
    jProject = project[0];
  } else if (projectFromSession) {
    jProject = JSON.parse(projectFromSession);
  } else {
    jProject = {
      id: 0,
      name: "",
    };
  }

  function logoutFunc() {
    setUser("");
    navigate("/");
    sessionStorage.clear();
  }

  const handleClicks = (text) => {
    Nav = text;
    return Nav;
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#66758F" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", backgroundColor: "#2B2D42" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
           
          </IconButton>
          <Typography variant="h6" noWrap component="div"></Typography>
          <div className="projectDiv">Project - {jProject.name}</div>
          <div className="topdiv">
            <div className="secdiv">
              <Button onClick={logoutFunc}>Logout</Button>
              <div>Logged in as: {jUser.name}</div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ backgrounColor: "lightgrey" }}
      >
        <DrawerHeader sx={{ backgroundColor: "#2B2D42", color: "white" }}>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? "" : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ backgroundColor: "#66758F", height: 10000 }}>
          {["Projects", "Details", "Quotes", "Schedules", "Drafts"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleClicks(index)}>
              {index === 0 ? (
                <>
                  <Link
                    to="/projects"
                    style={{
                      color: "lightgrey",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <KeyboardReturnIcon
                      sx={{ color: "white", marginRight: 3.5, marginLeft: 0.5 }}
                    />
                    <p style={{ color: "lightgrey", textDecoration: "none", marginTop: 1 }}>
                      <strong>{text}</strong>
                    </p>
                  </Link>
                </>
              ) : (
                ""
              )}
              {index === 1 ? (
               <>
               <Link
                 to="/project"
                 style={{
                   color: "lightgrey",
                   textDecoration: "none",
                   display: "flex",
                   flexDirection: "row",
                 }}
               >
                 <HomeIcon
                   sx={{ color: "white", marginRight: 3.5, marginLeft: 0.5 }}
                 />
                 <p style={{ color: "lightgrey", textDecoration: "none", marginTop: 1 }}>
                   <strong>{text}</strong>
                 </p>
               </Link>
             </>
           ) : (
             ""
           )}
              {index === 2 ? (
                <>
                <Link
                  to="/project"
                  style={{
                    color: "lightgrey",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <WarehouseIcon
                    sx={{ color: "white", marginRight: 3.5, marginLeft: 0.5 }}
                  />
                  <p style={{ color: "lightgrey", textDecoration: "none", marginTop: 1 }}>
                    <strong>{text}</strong>
                  </p>
                </Link>
              </>
            ) : (
              ""
            )}
              {index === 3 ? (
                <>
                <Link
                  to="/project"
                  style={{
                    color: "lightgrey",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <WatchLaterIcon
                    sx={{ color: "white", marginRight: 3.5, marginLeft: 0.5 }}
                  />
                  <p style={{ color: "lightgrey", textDecoration: "none", marginTop: 1 }}>
                    <strong>{text}</strong>
                  </p>
                </Link>
              </>
            ) : (
              ""
            )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, height: 10000 }}
      >
        <DrawerHeader />
        {Nav === 0 ? <DetailsPage /> : ""}
        {Nav === 1 ? <DetailsPage /> : ""}
        {Nav === 2 ? <QuotesPage /> : ""}
        {Nav === 3 ? <SchedulePage /> : ""}
      </Box>
    </Box>
  );
}
