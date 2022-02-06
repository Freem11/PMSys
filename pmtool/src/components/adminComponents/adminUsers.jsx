import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import AdminUsersTable from'./adminUsersTable'
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { allAvailableUsers } from '../AxiosFuncs/adminUsersAxiosFuncs'
import { Button, Form, Input } from "reactstrap";
import CreateNewUser from "./adminCreateUser"
import FormModal from '../ModalForms/formModal'
import "./materialsPage.scss";

const AdminUsersPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [users, setUsers] = useState([])

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
        email: '',
        password: '',
        admin: ''
      });

        useEffect(() => {
        let list = allAvailableUsers('','')

        Promise.all([list])
        .then((response) => {
            setUsers(response[0]);
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

      let searchVal = allAvailableUsers(formVals)

      Promise.all([searchVal])
      .then((response) => {
          setUsers(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return(
        <div>
          <h2 style={{marginLeft: '5%'}}>Users</h2>
      <div className="buttondiv" style={{marginTop: '4%'}}>
      <Form onSubmit={handleSubmit} style={{width:'100%'}}>
        
        <div id="searchbox">

          <div className='searchproj'>
            <Button className="searchButton">Search</Button>
            <Input
              value={formVals.text}
              placeholder="User Name"
              style={{textAlign: 'center'}}
              className="searchInput"
              type="text"
              name="text"
              bsSize="lg"
              onChange={handleChange}
            ></Input>

            <Input
              value={formVals.email}
              placeholder="Email"
              style={{textAlign: 'center'}}
              className="searchInput1"
              type="text"
              name="email"
              bsSize="lg"
              onChange={handleChange}
            ></Input>
          </div>

          <div className='addproj'>
          <Button onClick={toggleModal} className="creatProjectButton" formVals={formVals}>+ User</Button>
          </div>
          </div>
     

        </Form>
      </div>

            <FormModal openup={modal} closeup={toggleModal} >
              <CreateNewUser
                closeup={toggleModal}
                users={users}
                setUsers={setUsers}
                formVals1={formVals}
              />
            </FormModal>
            
            <AdminUsersTable className="projTable" users={users} setUsers={setUsers} formVals={formVals}/>
    
        </div>
    )

}

export default AdminUsersPage;