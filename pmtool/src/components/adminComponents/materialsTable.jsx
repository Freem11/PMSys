import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../userContext'
import { useNavigate } from "react-router-dom";
import { allAvailableMaterials } from '../AxiosFuncs/adminMaterialAxiosFuncs'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
// import PositionedMenu from './popUp'
import "../projectsPage.scss"; 


const MaterialsTable = (props) => {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { materials } = props
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

      const twoX = (id) => {
        //   let data = getProjectById(id)

        //   Promise.all([data])
        //   .then((response) => {
        //     setProject(response);
        //     window.sessionStorage.setItem("project", JSON.stringify(...response))
        //     navigate("/project");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

     
    }


    return(
     <TableContainer
    style={{ width: '90%', margin: 'auto', borderRadius: '5px', marginTop: 30}}>
       {jUser.password && <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={{color: 'rgb(237, 237, 237)', width: 200, fontSize: 16, paddingLeft: 39}}><strong>Name</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Type</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Location</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Price</strong></TableCell>
                    <TableCell align='center' style={{color: 'rgb(237, 237, 237)', width: 100, fontSize: 16}}><strong>Options</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {materials && materials.sort((a,b) => a.id - b.id).map((material, index) => (
                    <TableRow key ={material.id} style={{ padding: 0}}>
                        <TableCell onClick={() => twoX(material.id)} sx={{ color: "#2B2D42", paddingLeft: 5}}><strong>{material.name}</strong></TableCell>
                        <TableCell onClick={() => twoX(material.id)} align='left' sx={{ color: "#2B2D42" }}><strong>{material.type}</strong></TableCell>
                        <TableCell onClick={() => twoX(material.id)} align='left' sx={{ color: "#2B2D42" }}><strong>{material.location}</strong></TableCell>
                        <TableCell onClick={() => twoX(material.id)} align='right' sx={{ color: "#2B2D42" }}><strong>${material.price}</strong></TableCell>
                        <TableCell align='center' style={{ height: 10}}>
                            {/* <PositionedMenu
                            material={material}
                            toggleModalOpen={modal} 
                            toggleModalClose={toggleModal}
                            /> */}
                        </TableCell>
                    </TableRow>
                ))}  
            </TableBody>
        </Table>}
    </TableContainer>
    )
}


export default MaterialsTable;