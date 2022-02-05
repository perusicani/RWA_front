import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    function getAuth() {
        return localStorage.getItem('auth_token');
    }

    return getAuth() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;