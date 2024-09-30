import { Routes, Route } from "react-router-dom";
import TableUsers from '../components/TableUsers';
import Home from '../components/Home';
import Login from '../components/Login';
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route
                    path='/users'
                    element={
                        <PrivateRoute >
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
            </Routes>

        </>
    )
}

export default AppRoutes