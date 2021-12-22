import TeamListItem from './teamListItem'
import { getTeamByProjectId } from '../AxiosFuncs/teamAxiosFuncs'
import { userById } from '../AxiosFuncs/userAxiosFuncs'
import { useState, useEffect, useContext } from 'react'
import { ProjectContext } from '../projectContext'

const TeamList = () => {

const [ team, setTeam ] = useState('');
const { project } = useContext(ProjectContext);
const projectFromSession = window.sessionStorage.getItem("project")
    
let jProject;
    if (project[0]) {
      jProject = project;
    } else if (projectFromSession) {
      jProject = [JSON.parse(projectFromSession)];
    } else {
      jProject = {
        id: 0,
        name: "",
      };
    }

useEffect(() => {

    let list0 = getTeamByProjectId(jProject[0].id)
    Promise.all([list0])
    .then((response) => {

        console.log("respone", response[0].data)
        setTeam(response[0].data)
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])

console.log("team", team)

let list;
if(team.length > 0) {
 list = team.map((user) => {
    return (
        <TeamListItem
        key={user.id}
        name={user.name}
        />
    );
});
} else {
   list = ''
}


 return <ul>{list}</ul>

}

export default TeamList;