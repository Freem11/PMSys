import React, { useState, useContext } from 'react';
import { TeamContext } from './teamContext';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserProject, getTeamByProjectId } from '../AxiosFuncs/teamAxiosFuncs'

const PositionedMenuTeam = (props) => {

  const { project, user1 } = props

  const { setTeam } = useContext(TeamContext);

  const projectFromSession = window.sessionStorage.getItem("project")
    
let jProject;
    if (project) {
      jProject = project;
    } else if (projectFromSession) {
      jProject = [JSON.parse(projectFromSession)];
    } else {
      jProject = {
        id: 0,
        name: "",
      };
    }

  let project1 = jProject[0].id

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const doTwo = (userId, projectId) => {

    
    let dels = deleteUserProject(userId, projectId)

      Promise.all([dels])
      .then((response) => {

        let list = getTeamByProjectId(projectId)
          Promise.all([list])
          .then((response) => {
          window.sessionStorage.setItem("team", JSON.stringify(...response))
          setTeam(response[0].data)
    })
    .catch((error) => {
      console.log(error);
    });

        

       
        })
        .catch((error) => {
          console.log(error);
        });

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
        <MoreVertIcon sx={{ color: 'white', marginBottom: -2}}/>
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
        <MenuItem onClick={() => doTwo(user1, project1)}><DeleteIcon/> Delete</MenuItem>
        
      </Menu>
    </div>
    
  );
}

export default PositionedMenuTeam