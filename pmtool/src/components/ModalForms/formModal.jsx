import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";

const style = {
    position: 'absolute',
    width: 550,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#66758F',
    border: '1ps solid #2B2D42',
    boxShadow: 24,
    p: 1.5,
    borderRadius: '5px',
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
                    <div>
                       <Button onClick={toggleModalClose}>X</Button>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default FormModal;