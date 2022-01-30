import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import { allAvailableTasks } from '../AxiosFuncs/adminTasksAxiosFuncs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PositionedMenu from './materialsPopUp'
import "../projectsPage.scss"; 


const AdminTasksTable = (props) => {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { adminTasks, setAdminTasks, formVals } = props
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

      const [modal, setModal] = useState(false)

      const toggleModal = () => {
          setModal(!modal);
      }

    return(
     <TableContainer
    style={{ width: '90%', margin: 'auto', borderRadius: '5px', marginTop: 30}}>
       {jUser.password && <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{color: 'rgb(237, 237, 237)', width: 200, fontSize: 16, paddingLeft: 39}}><strong>Name</strong></TableCell>
                    <TableCell align='left' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Category</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Options</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {adminTasks && adminTasks.sort((a,b) => a.id - b.id).map((adminTasks, index) => (
                    <TableRow key ={adminTasks.id} style={{ padding: 0}}>
                        <TableCell  sx={{ color: "#2B2D42", paddingLeft: 5}}><strong>{adminTasks.name}</strong></TableCell>
                        <TableCell  align='left' sx={{ color: "#2B2D42" }}><strong>{adminTasks.type}</strong></TableCell>
                        <TableCell align='center' style={{ height: 10}}>
                            <PositionedMenu
                            adminTasks={adminTasks}
                            id={adminTasks.id}
                            formVals={formVals}
                            setAdminTasks={setAdminTasks}
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


export default AdminTasksTable;