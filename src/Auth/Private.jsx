import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../Context/Shopcontext';

function Private({ children }) {
    const { user } = useContext(ShopContext);
    return user ? children : <Navigate to={"/login"} replace />;
}

export default Private;