import { useContext, useEffect, useState } from 'react'
import { UserContext } from './userContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import FormModal from './ModalForms/formModal'
import EditProject from "./ModalForms/editProject"
import PositionedMenu from './popUp'
import "./projectsPage.scss";


const ProjectsTable = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [projects, setProjects]= useState([])
    const [project, setProject]= useState('')
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

    useEffect(() => {
        return axios.post("http://localhost:5000/projects", { userId: jUser.id })
        .then(response => {
            setProjects(response.data)
        })
      }, [])

      const [modal, setModal] = useState(false)

      const toggleModal = () => {
          setModal(!modal);
      }

    return(
     <TableContainer
    style={{ width: '90%', margin: 'auto', borderRadius: '5px', marginTop: 100}}>
       {jUser.password && <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{color: 'rgb(237, 237, 237)', width: 500, fontSize: 16, paddingLeft: 39}}><strong>Name</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Status</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Options</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projects && projects.sort((a,b) => a.id - b.id).map((project, index) => (
                    <TableRow key ={project.id} style={{ padding: 0}} >
                        <TableCell sx={{ color: "#2B2D42", paddingLeft: 5}}><strong>{project.name}</strong></TableCell>
                        <TableCell align='center' sx={{ color: "#2B2D42" }}><strong>{project.status}</strong></TableCell>
                        <TableCell align='center' style={{ height: 10}}>
                            <PositionedMenu
                            project={project}
                            toggleModalOpen={modal} 
                            toggleModalClose={toggleModal}
                            />
                        </TableCell>
                    </TableRow>
                ))}  
            </TableBody>
        </Table>}
    </TableContainer>
    )
}


export default ProjectsTable;