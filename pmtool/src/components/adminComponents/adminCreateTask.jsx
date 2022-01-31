import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableTasks, addTask, getTaskCats, getTaskCategories } from '../AxiosFuncs/adminTasksAxiosFuncs'
import "./adminCreateTask.scss"

const CreateNewTask = (props) => {

  const { closeup, setAdminTasks, formVals1 } = props
  const [categories, setCategories] = useState("");
  
  useEffect(() => {
    let data = getTaskCategories();

    Promise.all([data])
      .then((response) => {
        console.log("this", response)
        setCategories(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [ formVals, setFormVals ] = useState({
    name: "",
    type: "",
    location: "",
    price: "",
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

    if (formVals.name && formVals.type) {

     let helper = addTask(formVals)

     Promise.all([helper])
      .then((response) => {

      let list = allAvailableTasks(formVals1)

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

  console.log("adjust", categories)
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="inputboxery">
        <Label style={{marginLeft: -30, marginBottom: 5}}><strong>Create New Task</strong></Label>
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
        
        <FormGroup >
          <div className="selectboxy">
          <Label for="user_id" id='locatey'><strong>Category</strong></Label>
          <Input
            onChange={handleChange}
            className="modalInputs2y"
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
                  {category.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>
        
        <FormGroup>
          <Button id="modalButtoy">Create Task</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewTask;
