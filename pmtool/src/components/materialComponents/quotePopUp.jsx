import React, { useState, useContext } from 'react';
import { ProjectContext } from '../projectContext'
import { QuoteContext, QuoteCostContext } from './quoteContext'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteQuoteItem, allQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'

const PositionedMenuTeam = (props) => {

  const { partId } = props
  const { project } = useContext(ProjectContext);
  const projectFromSession = window.sessionStorage.getItem("project")
  const { setQuote } = useContext(QuoteContext);
  const { setQuoteCosts } = useContext(QuoteCostContext);

let jProject;
    if (project.length > 0) {
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


  const doTwo = (partId) => {

    let dels = deleteQuoteItem(partId)

      Promise.all([dels])
      .then((response) => {
        let list = allQuote(jProject[0].id)
          Promise.all([list])
          .then((response) => {
          setQuote(response[0])

          let total = quoteTotal(jProject[0].id)

          Promise.all([total])
          .then((response) => {
              setQuoteCosts(response[0].sum) 
          })
          .catch((error) => {
              console.log(error);
          });
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
        <MenuItem onClick={() => doTwo(partId)}><DeleteIcon/> Delete</MenuItem>
        
      </Menu>
    </div>
    
  );
}

export default PositionedMenuTeam