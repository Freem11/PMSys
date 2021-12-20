import { useContext, useState } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ProjectsTable from'./projectsTable'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CreateNewProject from "./ModalForms/createProject"
import FormModal from './ModalForms/formModal'
import "./projectsPage.scss";

const ProjectsPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

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
        setUser("");
        navigate("/");
        sessionStorage.clear();
      }
      
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
      })(({ theme, open }) => ({
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
       
      }));

      const [modal, setModal] = useState(false)

      const toggleModal = () => {
          setModal(!modal);
      }


    return(
        <div>
         <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", backgroundColor: "#2B2D42", zIndex: 0 }}>
           <div className="title">My Projects</div> 
          <Typography variant="h6" noWrap component="div"></Typography>

          <div className="topdiv">
            <div className="secdiv">
              <Button onClick={logoutFunc}>Logout</Button>
              <div>Logged in as: {jUser.name}</div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
            <div className="buttondiv">
            <Button onClick={toggleModal} className="creatProjectButton">+ Project</Button>
            </div>
            <FormModal toggleModalOpen={modal} toggleModalClose={toggleModal}>
              <CreateNewProject
                toggleModalClose={toggleModal}
              />
            </FormModal>
            
            <ProjectsTable className="projTable"/>
    
        </div>
    )

}

export default ProjectsPage;