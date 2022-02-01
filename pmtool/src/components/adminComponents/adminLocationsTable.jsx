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
import PositionedMenu from './locationsPopUp'
import "../projectsPage.scss"; 


const AdminLocationsTable = (props) => {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { locations, setLocations } = props
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
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 120, fontSize: 16}}><strong>Region</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 140, fontSize: 16}}><strong>Options</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {locations && locations.sort((a,b) => a.id - b.id).map((location, index) => (
                    <TableRow key ={locations.id} style={{ padding: 0}}>
                        <TableCell  sx={{ color: "#2B2D42", paddingLeft: 5}}><strong>{location.name}</strong></TableCell>
                        <TableCell align='center' style={{ height: 10}}>
                            <PositionedMenu
                            locations={locations}
                            id={location.id}
                            name={location.name}
                            setLocations={setLocations}
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


export default AdminLocationsTable;