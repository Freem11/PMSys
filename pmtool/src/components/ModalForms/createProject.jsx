import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { UserContext } from "../userContext";
import { ProjectContext } from "../projectContext";
import { allUsers } from "../AxiosFuncs/userAxiosFuncs";
import { registerProject } from "../AxiosFuncs/projectAxiosFuncs"
import "./createProject.scss"

const CreateNewProject = (props) => {

  const { toggleModalClose } = props

  const [users, setUsers] = useState("");

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

  const [ formVals, setFormVals ] = useState({
    title: "",
    status: "Pending",
    user_id: jUser.id,
    team: [],
  });

  const handleChange = (e) => {
    let opts = [],
      opt;

    if (e.target.type === "select" || e.target.type === "select-multiple") {
      for (let i = 0; i < e.target.options.length; i++) {
        opt = e.target.options[i];

        if (opt.selected) {
          opts.push(opt.value);
        }
      }
      setFormVals({ ...formVals, [e.target.name]: opts });
    } else {
      opt = e.target.value;
      setFormVals({ ...formVals, [e.target.name]: opt });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (formVals.title) {
      registerProject(formVals)
      toggleModalClose()
    }
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="inputbox">
        <Label><strong>Create New Project</strong></Label>
        <FormGroup>
          <Input
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
          <Label for="team"><strong>Select Team Members</strong></Label>
          <Input
            onChange={handleChange}
            className="modalInputs2"
            type="select"
            name="team"
            multiple
            bsSize="lg"
          >
            {users && users.map((user, index) => (
                <option
                  id={index}
                  name="team"
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
          <Button className="modalButton">Create Project</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewProject;
