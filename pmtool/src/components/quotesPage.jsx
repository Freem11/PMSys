import { useContext } from 'react'
import { UserContext } from './userContext'
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ProjectsTable from'./projectsTable'


const QuotesPage = () => {

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
        <Button/>
        </div>
    )

}

export default QuotesPage;