import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useState } from 'react'

const MoreOptions = function() {
    const [elem, setElem] = useState(null);

    const selections = ["Edit", "Delete"]

    const open = Boolean(elem)

    const handleClose = () => {
        setElem(null);
    };

    return (
        <div>
            <IconButton 
            onClick={(e)=> {setElem(e.target.currentTarget)}}
            >
            <MoreVertIcon sx={{ color: "#2B2D42" }}/>
            </IconButton>
            <Menu
            anchorEl={elem}
            keepMounted onClose={handleClose}
            open={open}
            >
            {selections.map((option) => (
                <MenuItem
                key={option}
                onClick={handleClose}>
                    {option}
                </MenuItem>
            ))}
            </Menu>
        </div>
    )

}
export default MoreOptions;