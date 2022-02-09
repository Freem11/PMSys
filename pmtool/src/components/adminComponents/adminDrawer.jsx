import { useState, useContext } from "react";
import { UserContext } from "../userContext";
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
import BuildIcon from '@mui/icons-material/Build';
import TaskIcon from '@mui/icons-material/Task';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItem from "@mui/material/ListItem";
import AdminMaterialsPage from "./adminMaterials"
import AdminTasksPage from "./adminTasks"
import AdminLocalsPage from "./adminLocations"
import AdminUsersPage from "./adminUsers"
import { Button } from "reactstrap";
import "../projectsPage.scss";

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
  const userFromSession = window.sessionStorage.getItem("user");
 
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
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", backgroundColor: "#102E4A" }}>
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
          <div className="projectDiv">Administrative Tools</div>
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
        <DrawerHeader sx={{ backgroundColor: "#102E4A", color: "white" }}>
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? "" : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ backgroundColor: "#FFFFFF", height: 10000 }}>
          {["Users", "Materials", "Tasks", "Locations"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleClicks(index)}>
              {index === 0 ? (
                <>
                  <Link
                    to="/admin"
                    style={{
                      color: "lightgrey",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "black", marginRight: 3.5, marginLeft: 0.5 }}
                    />
                    <p style={{ color: "#57799E", textDecoration: "none", marginTop: 1 }}>
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
                 to="/admin"
                 style={{
                   color: "lightgrey",
                   textDecoration: "none",
                   display: "flex",
                   flexDirection: "row",
                 }}
               >
                 <BuildIcon
                   sx={{ color: "black", marginRight: 3.5, marginLeft: 0.5 }}
                 />
                 <p style={{ color: "#57799E", textDecoration: "none", marginTop: 1 }}>
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
                  to="/admin"
                  style={{
                    color: "lightgrey",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TaskIcon
                    sx={{ color: "black", marginRight: 3.5, marginLeft: 0.5 }}
                  />
                  <p style={{ color: "#57799E", textDecoration: "none", marginTop: 1 }}>
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
                  to="/admin"
                  style={{
                    color: "lightgrey",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <AddLocationAltIcon
                    sx={{ color: "black", marginRight: 3.5, marginLeft: 0.5 }}
                  />
                  <p style={{ color: "#57799E", textDecoration: "none", marginTop: 1 }}>
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
        sx={{ flexGrow: 1, p: 3, height: 10000, width: 20000 }}
      >
        <DrawerHeader />
        {Nav === 0 ? <AdminUsersPage /> : ""}
        {Nav === 1 ? <AdminMaterialsPage /> : ""}
        {Nav === 2 ? <AdminTasksPage /> : ""}
        {Nav === 3 ? <AdminLocalsPage /> : ""}
   
      </Box>
    </Box>
  );
}
