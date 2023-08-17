import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";

function PrivateRoute({ children}) {
    const { authTokens } = useAuth();
    
    return (
        authTokens == 1 ? children : <Navigate to="/login" />
    );
}

export default PrivateRoute;