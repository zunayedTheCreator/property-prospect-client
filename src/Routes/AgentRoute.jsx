import React, { useEffect, useState } from 'react';
import useAgent from '../hooks/useAgent';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AgentRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAgent, isAgentLoading] = useAgent();
    const location = useLocation();

    if (loading || isAgentLoading) {
        return;
    }

    if (user && isAgent) {
        return children;
    }

    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default AgentRoute;