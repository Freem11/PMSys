import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from './AxiosFuncs/projectAxiosFuncs'
import FormModal from './ModalForms/formModal'
import EditProject from './ModalForms/editProject'
const PositionedMenu = (props) => {

  const { project, toggleModalOpen, toggleModalClose } = props

        console.log(project.id)

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
        <MenuItem onClick={() => deleteProject(project.id)}><DeleteIcon/>Delete</MenuItem>
        <MenuItem onClick={toggleModal}><EditIcon/>Edit</MenuItem>
  
      </Menu>
       <FormModal 
        project={project}
        openup={modal} 
        closeup={toggleModal}>
        <EditProject
        project1={project}
        closeup={toggleModal}/>
        </FormModal>
    </div>
    
  );
}

export default PositionedMenu