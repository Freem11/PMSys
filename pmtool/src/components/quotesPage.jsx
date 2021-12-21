import { useContext } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { useNavigate } from "react-router-dom";


const QuotesPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { project, setProject } = useContext(ProjectContext);

    const userFromSession = window.sessionStorage.getItem("user")
  
    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else {
        jUser = JSON.parse(userFromSession)
    }
    
    console.log(project)

    return(
        <div>
        <p>Hello: {project[0].name}</p>
        </div>
    )

}

export default QuotesPage;