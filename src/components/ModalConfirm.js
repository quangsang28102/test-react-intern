import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import { deleteDeleteUser } from '../services/UserService';
import { toast } from 'react-toastify';




const ModalConfirm = (props) => {

    const { show, handleModalDeleteClose, handleConfirmDeletefromModal, dataUserDelete } = props

    const handleConfirm = async () => {
        let res = await deleteDeleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            handleConfirmDeletefromModal(dataUserDelete)
            //console.log("check user deleted", res)
            //console.log("check resss", res)
            toast.success("A user is deleted success!")
            handleModalDeleteClose()
        }
    }

    return (
        <>
            <Modal
                style={{}}
                show={show}
                onHide={handleModalDeleteClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure to delete this user?
                        <br />
                        <b>Email </b> {dataUserDelete.email}

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalDeleteClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;