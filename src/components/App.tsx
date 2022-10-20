import { useCallback } from 'react';
import './App.less';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './navbar';
import LandingPage from './landing-page';
import { ROUTES } from '../constants';

function App() {
    const location = useLocation();

    const renderLandingPage = useCallback(() => {
        if (location.pathname === ROUTES.ROOT) return <LandingPage />;
        return null;
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            {renderLandingPage()}
            <Outlet />
        </>
    );
}

export default App;
