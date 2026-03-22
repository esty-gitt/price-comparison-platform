import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ allowedRoles}) => {
    const user = useSelector((state) => state.user.userInfo);
    const isLoggedIng= useSelector((state) => state.user.isLoggedIng);
    if(!isLoggedIng)
    return <Navigate to="/"  />;
    if(!allowedRoles.includes(user.permission))
{
    return <Navigate to="/unauthorized" />; 
    }
    return  <Outlet />; 

}
export default ProtectedRoute;
