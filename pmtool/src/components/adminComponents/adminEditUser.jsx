import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableUsers, updateUserById } from '../AxiosFuncs/adminUsersAxiosFuncs'
import "./adminEditUser.scss"

const EditUser = (props) => {

  const { closeup, setUsers, user1, formVals2 } = props
  const [ formVals, setFormVals ] = useState({
    id: user1.id,
    name: user1.name,
    email: user1.email,
    password: user1.password,
    admin: user1.admin,
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

     let helper = updateUserById(formVals)

     Promise.all([helper])
      .then((response) => {

      let list = allAvailableUsers(formVals2)

            Promise.all([list])
            .then((response) => {
              setUsers(response[0]);
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
        <div className="inputboxerx">
        <Label style={{marginLeft: '64px', marginBottom: '10px'}}><strong>Edit User</strong></Label>
        <FormGroup>
        <Label for="user_id" id='nmex'><strong>Name</strong></Label>
          <Input
            value={formVals.name}
            className="modalInputsx"
            style={{textAlign: 'center'}}
            id='username'
            type="text"
            name="name"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
        <Label for="user_id" id='emailx'><strong>Email</strong></Label>
          <Input
            value={formVals.email}
            className="modalInputsx"
            style={{textAlign: 'center'}}
            id='useremail'
            type="text"
            name="email"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
        <Label for="user_id" id='passx'><strong>Password</strong></Label>
          <Input
            value={formVals.password}
            className="modalInputsx"
            style={{textAlign: 'center'}}
            id='userpass'
            type="text"
            name="password"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
      
        <FormGroup style={{marginLeft: '-3%'}}>
          <Button id="modalButtox">Update User</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default EditUser;
