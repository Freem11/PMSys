import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addTaskCat, getTaskCategories } from '../AxiosFuncs/adminTasksAxiosFuncs'
import "./adminCreateTaskCateg.scss"

const CreateNewTaskCat = (props) => {

  const { closeup, setTaskCats } = props
  const [ formVals, setFormVals ] = useState({
    name: ""
  });

  const handleChange = (e) => {
    let opts = [],
      opt;

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

    if (formVals.name) {

     let helper = addTaskCat(formVals)

     Promise.all([helper])
      .then((response) => {

      let list = getTaskCategories()

            Promise.all([list])
            .then((response) => {
              setTaskCats(response[0]);
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
        <Label style={{marginLeft: -70, marginBottom: 5}}><strong>Create New Task Category</strong></Label>
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
        </div>
  
        <FormGroup>
          <Button id="modalButtoy">Create Category</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewTaskCat;
