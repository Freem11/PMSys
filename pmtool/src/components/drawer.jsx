import { useState, useContext  } from 'react';
import { UserContext } from './userContext'
import { useNavigate, Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Icon from '@mui/material/Icon';
import ProjectsPage from './projectsPage';
import { Button } from "reactstrap";
import "./projectsPage.scss";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

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

    const userFromSession = window.sessionStorage.getItem("user")
  
    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else if (userFromSession) {
        jUser = JSON.parse(userFromSession)
    } else {
        jUser = {
            id: 0,
            name: "",
        }
    }


    function logoutFunc() {
            setUser('')
            navigate("/");
            sessionStorage.clear();
    }

  return (
    <Box sx={{ display: 'flex', backgroundColor:'#66758F'}} >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', backgroundColor: '#2B2D42'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
           <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          </Typography>

          <div className="topdiv">
          <div className="secdiv">
        <div>Logged in as: {jUser.name}</div> 
        <Button onClick={logoutFunc}>Logout</Button>
        </div> 
        </div>

        </Toolbar >
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ backgrounColor:'lightgrey'}}>
        <DrawerHeader sx={{ backgroundColor: '#2B2D42', color:'white'}}>
          <IconButton onClick={handleDrawerClose} sx={{ color:'white'}}>
            {theme.direction === 'rtl' ? "" : <MenuIcon/> }
          </IconButton>
        </DrawerHeader>

        <List sx={{ backgroundColor:'#66758F', height: 10000}}>
          {['Projects', 'Quotes', 'Schedules', 'Drafts'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon sx={{ color:'white'}}>
                {index  === 0 ?  <><Link to="/projects"><MailIcon sx={{color: 'white'}}/></Link></> : ""}
                {index  === 1 ?  <><Link to="/"><InboxIcon sx={{color: 'white'}}/></Link></> : ""}
                {index  === 2 ?  <><Link to="/projects"><MailIcon sx={{color: 'white'}}/></Link></> : ""}
                {index  === 3 ?  <><Link to="/"><InboxIcon sx={{color: 'white'}}/></Link></> : ""}
              </ListItemIcon>
              {index  === 0 ? <><Link to="/projects" style={{ color:'lightgrey', textDecoration: 'none'}}><strong>{text}</strong></Link></> : ""}
              {index  === 1 ? <><Link to="/" style={{ color:'lightgrey', textDecoration: 'none'}}><strong>{text}</strong></Link></> : ""}
              {index  === 2 ? <><Link to="/projects" style={{ color:'lightgrey', textDecoration: 'none'}}><strong>{text}</strong></Link></> : ""}
              {index  === 3 ? <><Link to="/" style={{ color:'lightgrey', textDecoration: 'none'}}><strong>{text}</strong></Link></> : ""}
            </ListItem>
          ))}
        </List>

      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "auto", height: 10000}}>
        <DrawerHeader/>
        <ProjectsPage />
    
      </Box>
    </Box>
  );
}