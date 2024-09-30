import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { putUpdateUser } from '../services/UserService';


const ModalEditUser = (props) => {

    const { show, handleEditUserClose, dataUserEdit, handleEditUserFromModal } = props
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");


    //console.log("check props", dataUserEdit)


    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
                email: email,
                last_name: lastName
            })
            //console.log("check resss", res)
            toast.success("A user is updated success!")
            handleEditUserClose()
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
            setEmail(dataUserEdit.email)
            setLastName(dataUserEdit.last_name)
        }
    }, [dataUserEdit])
    return (
        <>
            <Modal
                show={show}
                onHide={handleEditUserClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} onChange={(event) => setName(event.target.value)}
                                type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control value={lastName} onChange={(event) => setLastName(event.target.value)}
                                type="text" placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={email} onChange={(event) => setEmail(event.target.value)}
                                type="text" placeholder="Enter job" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Job</Form.Label>
                            <Form.Control value={job} onChange={(event) => setJob(event.target.value)}
                                type="text" placeholder="Enter job" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditUserClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalEditUser;