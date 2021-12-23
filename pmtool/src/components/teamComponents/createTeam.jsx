import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { TeamContext } from "./teamContext";
import { ProjectContext } from "../projectContext";
import { allUsers, userByName } from "../AxiosFuncs/userAxiosFuncs";
import { registerUserProject, getTeamByProjectId } from "../AxiosFuncs/teamAxiosFuncs"
import "./createTeam.scss"


const CreateNewTeamMember = (props) => {

  const [users, setUsers] = useState("");

  const { project } = useContext(ProjectContext);
  const { team, setTeam } = useContext(TeamContext);

  useEffect(() => {
    let data = allUsers();

    Promise.all([data])
      .then((response) => {
        setUsers(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const [ formVals, setFormVals ] = useState({
    project_id: '',
    user_id: ','
  });


  const handleSubmit = (e) => {

    let opt = e.target.value;

        let user = userByName(opt)
        Promise.all([user])
        .then((response) => {
          let uId = response[0][0].id
          let pId =  jProject.id
      
          registerUserProject(uId, pId)
          let list = getTeamByProjectId(jProject.id)
     
           Promise.all([list])
           .then((response) => {
             setTeam(response[0].data);
           })
           .catch((error) => {
             console.log(error);
           });
        })
        .catch((error) => {
          console.log(error);
        });
    return;
  };


  return (
    <Container fluid>
      <Form>
        <FormGroup >
          <div className="selectbox">
          <Label for="team"><strong>Add Team Members</strong></Label>
          <Input
            className="modalInputs2"
            type="select" 
            multiple
            name="team"
            bsSize="lg"
          >
            {users && users.map((user, index) => (
                <option
                  id={index}
                  name="team"
                  key={user.id}
                  values={user.id}
                  className="modalSelect"
                  onClick={handleSubmit}
                >
                  {user.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewTeamMember
  ;
