import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUser, allAvailableUsers } from '../AxiosFuncs/adminUsersAxiosFuncs'
import FormModal from '../ModalForms/formModal'
import EditUser from './adminEditUser'

const PositionedMenu = (props) => {

  const { user, setUsers, formVals } = props
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
      setModal(!modal);
  }

  const doBoth = () => {
        toggleModal()
        handleClose()
  }

  const doTwo = (id) => {

    let dels = deleteUser(id)

      Promise.all([dels])
      .then((response) => {

        let text = ""
        let list = allAvailableUsers(formVals)

        Promise.all([list])
        .then((response) => {
          setUsers(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
  
})

  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: '#2B2D42'}}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={doBoth}><EditIcon/> Edit</MenuItem>
        <MenuItem onClick={() => doTwo(user.id)}><DeleteIcon/> Delete</MenuItem>
        
      </Menu>
       <FormModal 
        user={user}
        formVals2={formVals}
        setUsers={setUsers}
        openup={modal} 
        closeup={toggleModal}>
        <EditUser
        user1={user}
        formVals2={formVals}
        setUsers={setUsers}
        closeup={toggleModal}/>
        </FormModal>
    </div>
    
  );
}

export default PositionedMenu