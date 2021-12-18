import { useContext } from 'react'
import { UserContext } from './userContext'
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ProjectsTable from'./projectsTable'


const ProjectsPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const userFromSession = window.sessionStorage.getItem("user")
  
    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else {
        jUser = JSON.parse(userFromSession)
    }

    return(
        <div>
        <ProjectsTable className="projTable"/>
        </div>
    )

}

export default ProjectsPage;