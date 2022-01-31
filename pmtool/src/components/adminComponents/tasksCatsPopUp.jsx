import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteTaskCat,
  getTaskCategories,
} from "../AxiosFuncs/adminTasksAxiosFuncs";

const PositionedMenu = (props) => {
  const { taskCats, setTaskCats, id, name } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const doBoth = () => {
    toggleModal();
    handleClose();
  };

  const doTwo = (id) => {
    if (name !== "N/A") {
      let dels = deleteTaskCat(id);

      Promise.all([dels]).then((response) => {
        let list = getTaskCategories();

        Promise.all([list])
          .then((response) => {
            setTaskCats(response[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "#2B2D42" }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => doTwo(id)}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default PositionedMenu;
