import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.scss"

const style = {
    position: 'absolute',
    width: 300,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'rgb(238, 235, 235)',
    border: '4px solid #102E4A',
    boxShadow: 24,
    p: 1.5,
    borderRadius: '10px',
};

const FormModal = (props) => {

    const { openup, closeup, children } = props

    return (
        <div>
            <Modal
                open={openup}
                close={closeup}
                >
                <Box sx = {style}>
                    <div className="modalBox">
                       <Button style={{ color: '#D8DBE2', backgroundColor: 'maroon', boxShadow: '2px 2px 3px 1px rgb(131, 127, 127)'}}className="modalButton2" onClick={closeup}>X</Button>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default FormModal;