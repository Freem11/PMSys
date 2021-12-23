import { useContext } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { useNavigate } from "react-router-dom";
import TeamList from './teamComponents/teamList'

const DetailsPage = () => {

    let navigate = useNavigate();

    const { project } = useContext(ProjectContext);
  
    // const userFromSession = window.sessionStorage.getItem("user")
    const projectFromSession = window.sessionStorage.getItem("project")

    let jProject
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
    
    return(
        <div>
        <h2>Current Status: {jProject.status}</h2>
        <TeamList/>
        </div>
    )

}

export default DetailsPage;