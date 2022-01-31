import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import AdminTasksTable from'./adminTasksTable'
import AdminTaskCategoriesTable from './adminTasksCategoriesTable'
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { allAvailableTasks, getTaskCategories } from '../AxiosFuncs/adminTasksAxiosFuncs'
import { Button, Form, Input } from "reactstrap";
import CreateNewTask from "./adminCreateTask"
import CreateNewTaskCat from "./adminCreateTaskCateg"
import FormModal from '../ModalForms/formModal'
import "./materialsPage.scss";

const AdminTasksPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [adminTasks, setAdminTasks] = useState([])
    const [taskCats, setTaskCats] = useState([])
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
        let list = allAvailableTasks('','')
        let list2 = getTaskCategories()

        Promise.all([list, list2])
        .then((response) => {
            setAdminTasks(response[0]);
            setTaskCats(response[1]);
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

      let searchVal = allAvailableTasks(formVals)

      Promise.all([searchVal])
      .then((response) => {
          setAdminTasks(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return(
        <div>
          <h2 style={{marginLeft: '5%'}}>Tasks</h2>

        <div className="flexDiv">
        <div className="leftDiv">
      <div className="buttondiv" style={{marginTop: '4%'}}>
      <Form onSubmit={handleSubmit} style={{width:'100%'}}>
        
        <div id="searchbox">

          <div className='searchproj'>
            <Button className="searchButton">Search</Button>
            <Input
              value={formVals.text}
              placeholder="Task Name"
              style={{textAlign: 'center'}}
              className="searchInput"
              type="text"
              name="text"
              bsSize="lg"
              onChange={handleChange}
            ></Input>

            <Input
              value={formVals.type}
              placeholder="Category"
              style={{textAlign: 'center'}}
              className="searchInput1"
              type="text"
              name="type"
              bsSize="lg"
              onChange={handleChange}
            ></Input>
          </div>

          <div className='addproj'>
          <Button onClick={toggleModal} className="creatProjectButton" formVals={formVals}>+ Task</Button>
          </div>
          </div>
     

        </Form>
      </div>
            
            <FormModal openup={modal} closeup={toggleModal} >
                <CreateNewTask
                  closeup={toggleModal}
                  adminTasks={adminTasks}
                  setAdminTasks={setAdminTasks}
                  formVals1={formVals}
                />
              </FormModal>
              
              <AdminTasksTable className="projTable" adminTasks={adminTasks} setAdminTasks={setAdminTasks} formVals={formVals}/>
            </div>
          
            <div className="rightDiv">

            <div className='addcat'>
          <Button onClick={toggleModal2} className="creatCategoryButton" formVals={formVals}>+ Categ</Button>
          </div>

            <FormModal openup={modal2} closeup={toggleModal2} >
                <CreateNewTaskCat
                  closeup={toggleModal2}
                  taskCats={taskCats}
                  setTaskCats={setTaskCats}
                />
              </FormModal>
              
              <AdminTaskCategoriesTable className="projTable" taskCats={taskCats} setTaskCats={setTaskCats}/>
            </div>
       

          </div>

        </div>
    )

}

export default AdminTasksPage;