import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { UserContext } from '../../contexts/UserContext';

import './styles.scss';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const { currentUser, setCurrentUserAndLocalStorage } =
        useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isRoot = location.pathname === ROUTES.ROOT;

    const onLogout = () => {
        setCurrentUserAndLocalStorage?.(null);
        navigate(ROUTES.ROOT);
    };

    const renderRelevantLinks = () => {
        if (!currentUser) {
            return (
                <>
                    <Link to={ROUTES.LOGIN}>Login</Link>
                    <Link to={ROUTES.CANDIDATE_SIGN_UP}>Register</Link>
                </>
            );
        }

        return (
            <>
                <Link to={ROUTES.JOB_LISTING}>Jobs</Link>
                <Link to={ROUTES.PROFILE}>Profile</Link>
                <a onClick={onLogout}>Logout</a>
            </>
        );
    };

    return (
        <nav id="navbar" className={`navbar ${isRoot ? 'white-text' : ''}`}>
            <div className="logo">
                <Link to="/">GYDJ</Link>
            </div>
            <div className="links">{renderRelevantLinks()}</div>
        </nav>
    );
};

export default Navbar;
