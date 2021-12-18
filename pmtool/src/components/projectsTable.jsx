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
import "./projectsPage.scss";


const ProjectsTable = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [projects, setProjects]= useState([])
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
      }, [jUser.id])

      const sortedProjects = projects.sort((a,b) => a.id - b.id);

    return(
     <TableContainer
    style={{ width: '80%', margin: 'auto', borderRadius: '10px'}}>
       {jUser.password && <Table>
            <TableHead>
                <TableRow>
                    <TableCell align='center' style={{color: 'rgb(202, 202, 202)'}}><strong>Name</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(202, 202, 202)'}}><strong>Status</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedProjects && sortedProjects.map((project, index) => (
                    <TableRow key ={project.id}>
                        <TableCell align='center'>{project.name}</TableCell>
                        <TableCell align='center'>{project.status}</TableCell>
                    </TableRow>
                ))}  
            </TableBody>
        </Table>}
    </TableContainer>
    )
}


export default ProjectsTable;