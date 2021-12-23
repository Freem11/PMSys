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
    bgcolor: '#66758F',
    border: '4px solid #2B2D42',
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
                       <Button style={{ backgroundColor: 'maroon'}}className="modalButton2" onClick={closeup}>X</Button>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default FormModal;