import { Routes, Route } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { useContext } from "react";
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className="m-auto col-6 mt-5" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You dont have permission to allow this!
                </p>
            </Alert>
        </>
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;