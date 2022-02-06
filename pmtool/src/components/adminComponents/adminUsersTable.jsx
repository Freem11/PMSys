import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import { allAvailableUsers } from '../AxiosFuncs/adminUsersAxiosFuncs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PositionedMenu from './usersPopUp'
import "../projectsPage.scss"; 


const AdminUsersTable = (props) => {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { users, setUsers, formVals } = props
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

      console.log("yaaaaa", users)

    return(
     <TableContainer
    style={{ width: '90%', margin: 'auto', borderRadius: '5px', marginTop: 30}}>
       {jUser.password && <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{color: 'rgb(237, 237, 237)', width: 200, fontSize: 16, paddingLeft: 39}}><strong>Name</strong></TableCell>
                    <TableCell align='left' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Email</strong></TableCell>
                    <TableCell align='left' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Password</strong></TableCell>
                    <TableCell align='right' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Admin</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Options</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users && users.sort((a,b) => a.id - b.id).map((user, index) => (
                    <TableRow key ={user.id} style={{ padding: 0}}>
                        <TableCell  sx={{ color: "#2B2D42", paddingLeft: 5}}><strong>{user.name}</strong></TableCell>
                        <TableCell  align='left' sx={{ color: "#2B2D42" }}><strong>{user.email}</strong></TableCell>
                        <TableCell  align='left' sx={{ color: "#2B2D42" }}><strong>{user.password}</strong></TableCell>
                        <TableCell  align='center' sx={{ color: "#2B2D42" }}><strong>{user.admin.toString()}</strong></TableCell>
                        <TableCell align='center' style={{ height: 10}}>
                            <PositionedMenu
                            user={user}
                            id={user.id}
                            formVals={formVals}
                            setUsers={setUsers}
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


export default AdminUsersTable;