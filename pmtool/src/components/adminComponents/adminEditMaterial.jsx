import { useState, useContext, useEffect } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { allAvailableMaterials, updateMaterialById } from '../AxiosFuncs/adminMaterialAxiosFuncs'
import { allLocations } from "../AxiosFuncs/locationAxiosFuncs";
import "./adminEditMaterial.scss"

const EditMaterial = (props) => {

  const { closeup, setMaterials, material1 } = props
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
    id: material1.id,
    name: material1.name,
    type: material1.type,
    location: material1.location,
    price: material1.price,
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

     let helper = updateMaterialById(formVals)

     Promise.all([helper])
      .then((response) => {

      let text = ""
      let list = allAvailableMaterials('', '')

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
        <div className="inputboxer">
        <Label style={{marginLeft: '70px', marginBottom: '10px'}}><strong>Edit Item</strong></Label>
        <FormGroup>
        <Label for="user_id" id='nme'><strong>Name</strong></Label>
          <Input
            value={formVals.name}
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='projname'
            type="text"
            name="name"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
        <Label for="user_id" id='typ'><strong>Type</strong></Label>
          <Input
            value={formVals.type}
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='projname'
            type="text"
            name="type"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>

        <FormGroup>
        <Label for="user_id" id='prc'><strong>Price</strong></Label>
          <Input
            value={formVals.price}
            className="modalInputs"
            style={{textAlign: 'center'}}
            id='projname'
            type="text"
            name="price"
            bsSize="lg"
            onChange={handleChange}
          ></Input>
        </FormGroup>
        </div>
        
        <FormGroup >
    
          <Label for="user_id" id='locate'><strong>Location</strong></Label>
          <Input
            value={formVals.location}
            onChange={handleChange}
            className="modalInputs2"
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
       
        </FormGroup>
        
        <FormGroup>
          <Button id="modalButto">Update Item</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default EditMaterial;
