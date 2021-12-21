import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { UserContext } from "../userContext";
import { ProjectContext } from "../projectContext";
import { allUsers, userByName } from "../AxiosFuncs/userAxiosFuncs";
import { getProjectById, updateProjectById } from '../AxiosFuncs/projectAxiosFuncs'
import "./createProject.scss"

const EditProject = (props) => {
  
  const { closeup, project1 } = props
  
  const [users, setUsers] = useState("");
  const [project, setProject] = useState("");


  const [ formVals, setFormVals ] = useState({
    title: project1.name,
    user_id: project1.user_id,
    project_id: project1.id
  });

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

  useEffect(() => {
   
    let data = getProjectById(project1.id);

    Promise.all([data])
      .then((response) => {
        setProject(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { user } = useContext(UserContext);

  const userFromSession = window.sessionStorage.getItem("user");

  let jUser;
  if (user[0]) {
    jUser = JSON.parse(user);
  } else if (userFromSession) {
    jUser = JSON.parse(userFromSession);
  } else {
    jUser = {
      id: 0,
      name: "",
    };
  }

  const handleChange = (e) => {

      let opt = e.target.value;
    if (e.target.type === "select-one") {

      if (opt) {

        userByName(opt)
        .then(result =>  setFormVals({ ...formVals, [e.target.name]: result[0].id }))
      }
    } else {
        setFormVals({ ...formVals, [e.target.name]: opt });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      updateProjectById(formVals)
      closeup()
    
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="inputbox">
        <Label><strong>Edit Project</strong></Label>
        <FormGroup>
          <Input
            value={formVals.title}
            placeholder="Project Name"
            className="modalInputs"
            type="text"
            name="title"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>

        <FormGroup >
          <div className="selectbox">
          <Label for="user_id"><strong>Re-Assign Project To</strong></Label>
          <Input
            onChange={handleChange}
            className="modalInputs2"
            type="select"
            name="user_id"
            bsSize="lg"
          >
             <option
                  id={-1}
                  name="user_id"
                  key={user.id}
                  values={user.id}
                  className="modalSelect"
                >
                </option>
            {users && users.map((user, index) => (
                <option
                  id={index}
                  name="user_id"
                  key={user.id}
                  values={user.id}
                  className="modalSelect"
                >
                  {user.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>

        <FormGroup>
          <Button className="modalButton">Apply Edit</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default EditProject;
