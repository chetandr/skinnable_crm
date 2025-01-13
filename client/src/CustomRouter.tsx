import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import AuthGuard from './AuthGuard';
import CRMLayout from './CRMLayout';
import Dashboard from './Dashboard';
import Stages from './Stages';
import Create from './Create';

const CustomRouter: React.FC = () => {
    return (
        <Routes>
            {/* Public Login Route */}
            <Route path="/" element={<Login />} />

            {/* Protected CRM Parent Route */}
            <Route
                path="/crm"
                element={
                    <AuthGuard>
                        <CRMLayout />
                    </AuthGuard>
                }
            >
                {/* Dashboard Route under CRM */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="stages" element={<Stages />} />
                <Route path="create/:template" element={<Create />} />
            </Route>
        </Routes>
    );
}

export default CustomRouter;