import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppRoutes from './Routes'

const AppRouter: React.FC = () => {
    return (
        <React.Fragment>
            <Routes>
                {AppRoutes.map((route, index) => (
                    <Route key={"app-route-" + index} path={route.path} element={route.component} />
                ))}
            </Routes>
        </React.Fragment>
    )
}

export default AppRouter 