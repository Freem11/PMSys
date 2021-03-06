import { useState } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableUsers, addUser } from '../AxiosFuncs/adminUsersAxiosFuncs'
import "./adminCreateUser.scss"

const CreateNewUser = (props) => {

  const { closeup, setUsers, formVals1 } = props
  const [ formVals, setFormVals ] = useState({
    name: "",
    email: "",
    password: "",
    admin: false,
  });

  const handleChange = (e) => {
    let opts = [],
      opt;

      let dollar;
      if (e.target.name === 'price') {
          dollar = "$"
      }

    if (e.target.type === "select" || e.target.type === "select-multiple") {
      for (let i = 0; i < e.target.options.length; i++) {
        opt = e.target.options[i];
      }
      setFormVals({ ...formVals, [e.target.name]: opts });
    } else {
      opt = e.target.value;
      setFormVals({ ...formVals, [e.target.name]: opt });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formVals.name && formVals.email && formVals.password) {

     let helper = addUser(formVals)

     Promise.all([helper])
      .then((response) => {

      let list = allAvailableUsers(formVals1)

            Promise.all([list])
            .then((response2) => {

              setUsers(response2[0]);
            })
            .catch((error) => {
              console.log(error);
            });
      })
      .catch((error) => {
        console.log(error);
      });

        closeup()
      }
    return;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="inputboxery">
        <Label style={{marginLeft: -30, marginBottom: 5}}><strong>Create New User</strong></Label>
        <FormGroup>
          <Input
            placeholder="Name"
            className="modalInputsy"
            style={{textAlign: 'center'}}
            id='projnamey'
            type="text"
            name="name"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Email"
            className="modalInputsy"
            style={{textAlign: 'center'}}
            id='projnamey'
            type="text"
            name="email"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Password"
            className="modalInputsy"
            style={{textAlign: 'center'}}
            id='projnamey'
            type="text"
            name="password"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup >
          <div className="selectboxa">
          <Label for="user_id" id='boola'><strong>Admin</strong></Label>
          <Input
            onChange={handleChange}
            className="modalInputs2y"
            type="select"
            name="admin"
            id="booli"
            bsSize="lg"
            defaultValue='false'
          >
             <option
                  id={0}
                  name="blank"
                  key={0}
                  values= ''
                  className="modalSelect"
                >
                </option>

                <option
                  id={1}
                  name="false"
                  key={1}
                  values= 'false'
                  className="modalSelect"
                > 
                false
                </option>

                <option
                  id={2}
                  name="true"
                  key={2}
                  values= 'true'
                  className="modalSelect"
                > 
                true
                </option>
         
              ))}
          </Input>
          </div>
        </FormGroup>
        </div>
    
        <FormGroup>
          <Button id="modalButtoy">Create User</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewUser;
