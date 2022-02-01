import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import AdminLocationsTable from'./adminLocationsTable'
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { allLocations } from '../AxiosFuncs/locationAxiosFuncs'
import { Button, Form, Input } from "reactstrap";
import CreateNewLocale from "./adminCreateLocation"
import FormModal from '../ModalForms/formModal'
import "./materialsPage.scss";

const AdminLocalsPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [locations, setLocations] = useState([])
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

      const [modal2, setModal2] = useState(false)

      const toggleModal2 = () => {
          setModal2(!modal2);
      }

      const [ formVals, setFormVals ] = useState({
        text: '',
        type: ''
      });

        useEffect(() => {
        let list = allLocations()

        Promise.all([list])
        .then((response) => {
            setLocations(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      }, [])


    return(
        <div>
          <h2 style={{marginLeft: '5%'}}>Regions</h2>

        <div className="flexDiv">
        <div className="leftDiv">
      <div className="buttondiv" style={{marginTop: '4%', marginTop: '-2%', marginBottom: '-1%'}}>
      <Form style={{width:'100%'}}>
        
        <div id="searchbox">
          <div className='addloc'>
          <Button onClick={toggleModal} className="creatLocaleButton" formVals={formVals}>+ Region</Button>
          </div>
          </div>
     

        </Form>
      </div>
            
            <FormModal openup={modal} closeup={toggleModal} >
                <CreateNewLocale
                  closeup={toggleModal}
                  locations={locations}
                  setLocations={setLocations}
                />
              </FormModal>
              
              <AdminLocationsTable className="projTable" locations={locations} setLocations={setLocations}/>
            </div>
  
          </div>

        </div>
    )

}

export default AdminLocalsPage;