import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../access/images/logo192.png'
import './header.scss'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useContext } from "react";

const Header = (props) => {

    const { logout, user } = useContext(UserContext);

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        checkLogged();
    }, [])

    const checkLogged = () => {

        if (localStorage.getItem("token")) {
            setIsLogin(true);
        }
        else {
            setIsLogin(false)
        }
    }

    const handleLogOut = () => {
        logout();
        setIsLogin(false)
        navigate("/")
        toast.success("Log out success!")
    }

    const handleLogIn = () => {
        navigate("/login"); // Điều hướng về trang chủ
    };



    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container >
                <Row>
                    <Col>
                        <Navbar.Brand className='m-auto'>
                            <NavLink className='d-flex m-auto nav-link' to={"/"} >
                                <img src={logoApp} alt='' />
                                <h2 className='my-auto pe-5'>React App</h2>
                            </NavLink>
                        </Navbar.Brand>
                    </Col>

                </Row>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto tabs ps-5">
                                <NavLink to="/" className={"nav-link"}>Home</NavLink>
                                <NavLink to="/users" className={"nav-link"} >Manage User</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.email && <div className='nav-link'>Welcom <b>{user.email}</b></div>}
                                <NavDropdown title="Action">
                                    {user && user.auth === true
                                        ? <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                                        : <NavDropdown.Item onClick={handleLogIn} >Log in</NavDropdown.Item>
                                    }
                                </NavDropdown>

                            </Nav>
                        </>
                    }


                </Navbar.Collapse>
            </Container>
        </Navbar >
    </>)
}
export default Header;