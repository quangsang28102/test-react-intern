import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { postLogIn } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from "react";

const Login = () => {

    const { loginContext } = useContext(UserContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingApi, setLoadingApi] = useState(false);
    const navigate = useNavigate();

    const handleLogIn = async () => {
        if (!email || !password) {
            toast.error("Emai/Password is requied!")
            return;
        }
        setLoadingApi(true)
        let res = await postLogIn(email.trim(), password);
        console.log("check res:   ", res)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/');
            toast.success("Login success!")
        }
        else
            toast.error(res.data.error)
        setLoadingApi(false)
    }

    // useEffect(() => {
    //     let token = localStorage.getItem("token")
    //     if (token) {
    //         navigate("/")
    //     }
    // })

    const handleGoBack = () => {
        navigate("/")

    }

    const handleClickEnter = (event) => {
        if (event && event.key === "Enter") {
            handleLogIn()
        }
    }
    return (
        <>
            <div className="logIn col-12 col-sm-4 ">
                <div className="title">
                    Log in
                </div>
                <div className="text">
                    Email or Username
                </div>
                <div className="input">
                    <input
                        type="text"
                        placeholder="Email or username..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => { handleClickEnter(event) }}
                    />
                </div>
                <Button
                    className={email && password.length >= 8 ? "active" : "disable"}
                    onClick={(handleLogIn)}
                >
                    {loadingApi && <i className="fa-solid fa-sync fa-spin px-2"></i>}
                    Log in
                </Button>
                <div className="back">
                    <i className="fa-solid fa-angle-left"></i>
                    <span onClick={handleGoBack}>Go back</span>

                </div>
            </div>
        </>
    )
}
export default Login;