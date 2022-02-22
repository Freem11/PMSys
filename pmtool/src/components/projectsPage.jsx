import { useContext, useState } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { ProjectsContext } from "./projectsContext";
import { useNavigate } from "react-router-dom";
import ProjectsTable from'./projectsTable'
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { getUserProjects } from './AxiosFuncs/projectAxiosFuncs'
import { Button, Form, Input } from "reactstrap";
import CreateNewProject from "./ModalForms/createProject"
import FormModal from './ModalForms/formModal'
import "./projectsPage.scss";

const ProjectsPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { project } = useContext(ProjectContext);
    const { setProjects } = useContext(ProjectsContext);

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

      const [ formVals, setFormVals ] = useState('');

      const handleChange = (e) => {
        setFormVals(e.target.value)
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      let searchVal = getUserProjects(jUser.id, formVals)

      Promise.all([searchVal])
      .then((response) => {
          setProjects(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return(
        <div>
         <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", backgroundColor: "#102E4A", zIndex: 0 }}>
           <div className="title">My Projects</div> 
          <Typography variant="h6" noWrap component="div"></Typography>

          <div className="topdiv">
            <div className="secdiv">
              <Button className="buttonlogout" onClick={logoutFunc}>Logout</Button>
              <div>Logged in as: {jUser.name}</div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className="buttondiv">
      <Form onSubmit={handleSubmit} style={{width:'100%'}}>
        
        <div id="searchbox">

          <div className='searchproj'>
            <Button className="searchButton">Search</Button>
            <Input
              value={formVals}
              placeholder="Project Search"
              style={{textAlign: 'center'}}
              className="searchInput"
              type="text"
              name="title"
              bsSize="lg"
              onChange={handleChange}
            ></Input>
          </div>

          <div className='addproj'>
          <Button onClick={toggleModal} className="creatProjectButton">+ Project</Button>
          </div>
          </div>
     

        </Form>
      </div>

            <FormModal openup={modal} closeup={toggleModal} >
              <CreateNewProject
                closeup={toggleModal}
                project={project}
              />
            </FormModal>
            
            <ProjectsTable className="projTable"/>
    
        </div>
    )

}

export default ProjectsPage;