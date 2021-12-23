import TeamListItem from './teamListItem'
import { getTeamByProjectId } from '../AxiosFuncs/teamAxiosFuncs'
import { useState, useEffect, useContext } from 'react'
import { TeamContext } from './teamContext';
import { ProjectContext } from '../projectContext'
import { Button } from "reactstrap";
import FormModal from '../ModalForms/formModal'
import CreateNewTeamMember from "./createTeam"
import "./teamList.scss";

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

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
      setModal(!modal);
  }

let list;
if(team.length > 0) {
 list = team.map((user) => {
    return (
        <TeamListItem
        key={user.id}
        name={user.name}
        user={user}
        setTeam={setTeam}
        />
    );
});
} else {
   list = ''
}


 return ( 
  <TeamContext.Provider value={{team, setTeam}}>
     <div>
        <ul id='teamList'>
        <li id='teamHead'><strong>Team Members</strong><Button id="plusbutton" onClick={toggleModal}>+</Button></li>
        {list}
        </ul>
       

        <FormModal openup={modal} closeup={toggleModal} >
          <CreateNewTeamMember
            closeup={toggleModal}
            project={project}
          />
        </FormModal>
        
    </div>
   </TeamContext.Provider>
 )
}

export default TeamList;