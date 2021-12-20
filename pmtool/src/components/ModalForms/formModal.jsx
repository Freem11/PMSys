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

    const { children, toggleModalOpen, toggleModalClose } = props

    return (
        <div>
            <Modal
                open={toggleModalOpen}
                close={toggleModalClose}
                >
                <Box sx = {style}>
                    <div className="modalBox">
                       <Button className="modalButton2" onClick={toggleModalClose}>X</Button>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default FormModal;