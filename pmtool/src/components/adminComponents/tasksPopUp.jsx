import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, allAvailableTasks } from '../AxiosFuncs/adminTasksAxiosFuncs'
import FormModal from '../ModalForms/formModal'
import EditMaterial from './adminEditMaterial'

const PositionedMenu = (props) => {

  const { adminTasks, setAdminTasks, formVals } = props
  
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

    let dels = deleteTask(id)

      Promise.all([dels])
      .then((response) => {

        let text = ""
        let list = allAvailableTasks('', '')

        Promise.all([list])
        .then((response) => {
          setAdminTasks(response[0]);
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
        <MenuItem onClick={() => doTwo(adminTasks.id)}><DeleteIcon/> Delete</MenuItem>
        
      </Menu>
       <FormModal 
        adminTasks={adminTasks}
        formVals2={formVals}
        setAdminTasks={setAdminTasks}
        openup={modal} 
        closeup={toggleModal}>
        <EditMaterial
        adminTasks1={adminTasks}
        formVals2={formVals}
        setAdminTasks={setAdminTasks}
        closeup={toggleModal}/>
        </FormModal>
    </div>
    
  );
}

export default PositionedMenu