import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import MaterialsTable from'./materialsTable'
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { allAvailableMaterials } from '../AxiosFuncs/adminMaterialAxiosFuncs'
import { Button, Form, Input } from "reactstrap";
// import CreateNewProject from "./ModalForms/createProject"
import FormModal from '../ModalForms/formModal'
import "../projectsPage.scss";

const AdminMaterialsPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [materials, setMaterials] = useState([])

    const userFromSession = window.sessionStorage.getItem("user")
  
    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else if (userFromSession) {
        jUser = JSON.parse(userFromSession)
    } else {
        jUser = {
            id: 0,
            name: "",
        }
    }

    function logoutFunc() {
        setUser("");
        navigate("/");
        sessionStorage.clear();
      }
      
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
      })(({ theme, open }) => ({
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
       
      }));

      const [modal, setModal] = useState(false)

      const toggleModal = () => {
          setModal(!modal);
      }

      const [ formVals, setFormVals ] = useState({
        text: '',
        location: ''
      });

        useEffect(() => {
        let list = allAvailableMaterials('','')

        Promise.all([list])
        .then((response) => {
            setMaterials(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      }, [])

      const handleChange = (e) => {
        setFormVals({...formVals, [e.target.name]: e.target.value})
      };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      let searchVal = allAvailableMaterials(formVals)

      Promise.all([searchVal])
      .then((response) => {
          setMaterials(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return(
        <div>
      <div className="buttondiv">
      <Form onSubmit={handleSubmit} style={{width:'100%'}}>
        
        <div id="searchbox">

          <div className='searchproj'>
            <Button className="searchButton">Search</Button>
            <Input
              value={formVals.text}
              placeholder="Items Search"
              style={{textAlign: 'center'}}
              className="searchInput"
              type="text"
              name="text"
              bsSize="lg"
              onChange={handleChange}
            ></Input>

            <Input
              value={formVals.location}
              placeholder="Location"
              style={{textAlign: 'center'}}
              className="searchInput"
              type="text"
              name="location"
              bsSize="lg"
              onChange={handleChange}
            ></Input>
          </div>

          <div className='addproj'>
          <Button onClick={toggleModal} className="creatProjectButton">+ Item</Button>
          </div>
          </div>
     

        </Form>
      </div>

            {/* <FormModal openup={modal} closeup={toggleModal} >
              <CreateNewProject
                closeup={toggleModal}
                project={project}
              />
            </FormModal> */}
            
            <MaterialsTable className="projTable" materials={materials}/>
    
        </div>
    )

}

export default AdminMaterialsPage;