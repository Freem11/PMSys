import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableTasks, updateTaskById, getTaskCats } from '../AxiosFuncs/adminTasksAxiosFuncs'
import "./adminEditTask.scss"

const EditTask = (props) => {

  const { closeup, setAdminTasks, adminTasks1, formVals2 } = props
  const [categories, setCategories] = useState("");
  
  useEffect(() => {
    let data = getTaskCats();

    Promise.all([data])
      .then((response) => {
        setCategories(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [ formVals, setFormVals ] = useState({
    id: adminTasks1.id,
    name: adminTasks1.name,
    type: adminTasks1.type,
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

    if (formVals.name && formVals.type) {

     let helper = updateTaskById(formVals)

     Promise.all([helper])
      .then((response) => {

      let text = ""
      let list = allAvailableTasks(formVals2)

            Promise.all([list])
            .then((response) => {
              setAdminTasks(response[0]);
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
        <Label style={{marginLeft: '60px', marginBottom: '10px'}}><strong>Edit Task</strong></Label>
        <FormGroup>
        <Label for="user_id" id='nmex'><strong>Name</strong></Label>
          <Input
            value={formVals.name}
            className="modalInputsx"
            style={{textAlign: 'center'}}
            id='projnamex'
            type="text"
            name="name"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
        
        <FormGroup >
          <div className="selectboxx">
          <Label for="user_id" id='locatex'><strong>Category</strong></Label>
          <Input
            value={formVals.type}
            onChange={handleChange}
            className="modalInputs2x"
            type="select"
            name="type"
            id="listsize"
            bsSize="lg"
          >
             <option
                  id={-1}
                  name="localed"
                  key={-1}
                  values=''
                  className="modalSelect"
                >
                </option>
            {categories && categories.map((category, index) => (
                <option
                  id={index}
                  name="user_id"
                  key={category.id}
                  values={category.id}
                  className="modalSelect"
                >
                  {category.type}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>
        
        <FormGroup style={{marginLeft: '-3%'}}>
          <Button id="modalButtox">Update Task</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default EditTask;
