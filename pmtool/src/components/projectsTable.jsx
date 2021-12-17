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

const ProjectsTable = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [projects, setProjects]= useState([])
    const userFromSession = window.sessionStorage.getItem("user")

    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else {
        jUser = JSON.parse(userFromSession)
    }

    useEffect(() => {
        return axios.post("http://localhost:5000/projects", { userId: jUser.id })
        .then(response => {
            setProjects(response.data)
        })
      }, [jUser.id])

      const sortedProjects = projects.sort((a,b) => a.id - b.id);

    return(
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedProjects && sortedProjects.map((project, index) => (
                    <TableRow key ={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>{project.status}</TableCell>
                    </TableRow>
                ))}  
            </TableBody>
        </Table>
    </TableContainer>
    )
}


export default ProjectsTable;