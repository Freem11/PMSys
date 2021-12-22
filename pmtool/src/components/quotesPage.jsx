import { useContext, useState, useEffect } from 'react'
// import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { useNavigate } from "react-router-dom";
import { getTeamByProjectId } from './AxiosFuncs/teamAxiosFuncs'
import { userById } from './AxiosFuncs/userAxiosFuncs'

const QuotesPage = () => {

    let navigate = useNavigate();
    // const { user, setUser } = useContext(UserContext);
    const { project } = useContext(ProjectContext);
    const [ team, setTeam ] = useState('');

    // const userFromSession = window.sessionStorage.getItem("user")
  
    // let jUser
    // if (user[0]){
    //     jUser = JSON.parse(user)
    // } else {
    //     jUser = JSON.parse(userFromSession)
    // }
    
    useEffect(() => {

        let teamMemebers = []
        let list0 = getTeamByProjectId(project[0].id)
        Promise.all([list0])
        .then((response) => {
            response[0].data.forEach(record => {
                let translated = userById(record.user_id)
                Promise.all([translated])
                .then((response2) => {
                    teamMemebers.push(response2[0][0].name)
                })
                .catch((error) => {
                    console.log(error);
                  });

            });
            
          setTeam(teamMemebers);
        })
        .catch((error) => {
          console.log(error);
        });

      }, [])

    console.log(project)
    console.log("team", team)
    return(
        <div>
        <h2>Quotes: </h2>
        </div>
    )

}

export default QuotesPage;