import React, { useState, useContext } from 'react';
import { UserContext } from "./userContext";
import { ProjectsContext } from "./projectsContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject, getUserProjects } from './AxiosFuncs/projectAxiosFuncs'
import FormModal from './ModalForms/formModal'
import EditProject from './ModalForms/editProject'

const PositionedMenu = (props) => {

  const { project } = props
  const { user, setUser } = useContext(UserContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const userFromSession = window.sessionStorage.getItem("user");

  let jUser;
  if (user[0]) {
    jUser = JSON.parse(user);
  } else if (userFromSession) {
    jUser = JSON.parse(userFromSession);
  } else {
    jUser = {
      id: 0,
      name: "",
    };
  }

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

    let dels = deleteProject(id)

      Promise.all([dels])
      .then((response) => {

        let list = getUserProjects(jUser.id)

        Promise.all([list])
        .then((response) => {
          setProjects(response[0]);
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
        <MenuItem onClick={() => doTwo(project.id)}><DeleteIcon/> Delete</MenuItem>
        
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