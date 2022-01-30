import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableMaterials, addMaterial } from '../AxiosFuncs/adminMaterialAxiosFuncs'
// import { registerProject, getUserProjects } from "../AxiosFuncs/projectAxiosFuncs";
import { allLocations } from "../AxiosFuncs/locationAxiosFuncs";
import "./adminCreateMaterial.scss"

const CreateNewMaterial = (props) => {

  const { closeup, setMaterials, formVals1 } = props
  const [locations, setLocations] = useState("");
  
  useEffect(() => {
    let data = allLocations();

    Promise.all([data])
      .then((response) => {
        setLocations(response[0]);
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

    if (formVals.name && formVals.type && formVals.price && formVals.location) {

     let helper = addMaterial(formVals)

     Promise.all([helper])
      .then((response) => {

      let text = ""
      let list = allAvailableMaterials(formVals1)

            Promise.all([list])
            .then((response) => {
              setMaterials(response[0]);
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
        <Label style={{marginLeft: -30, marginBottom: 5}}><strong>Create New Item</strong></Label>
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
            placeholder="Type"
            className="modalInputsy"
            style={{textAlign: 'center'}}
            id='projnamey'
            type="text"
            name="type"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Price"
            className="modalInputsy"
            style={{textAlign: 'center'}}
            id='projnamey'
            type="text"
            name="price"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
        
        <FormGroup >
          <div className="selectboxy">
          <Label for="user_id" id='locatey'><strong>Location</strong></Label>
          <Input
            onChange={handleChange}
            className="modalInputs2y"
            type="select"
            name="location"
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
            {locations && locations.map((area, index) => (
                <option
                  id={index}
                  name="user_id"
                  key={area.id}
                  values={area.id}
                  className="modalSelect"
                >
                  {area.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>
        
        <FormGroup>
          <Button id="modalButtoy">Create Item</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewMaterial;
