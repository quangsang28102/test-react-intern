import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreatUser } from '../services/UserService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalAddNew = (props) => {

    const { show, handleClose, handleUpdateUser } = props
    const [name, setName] = useState("");
    const [job, setJob] = useState("");



    const handleSaveUser = async () => {
        let res = await postCreatUser(name, job)
        console.log("check res: ", res)
        if (res && res.id) {
            handleClose();
            setName("");
            setJob("");
            toast.success("A user is created success!")
            handleUpdateUser({ first_name: name, id: res.id });
        }
    }
    return (
        <>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(event) => setName(event.target.value)}
                                type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Job</Form.Label>
                            <Form.Control value={job} onChange={(event) => setJob(event.target.value)}
                                type="text" placeholder="Enter job" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalAddNew;