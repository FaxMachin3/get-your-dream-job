import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

import './styles.scss';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">GYDJ</Link>
            </div>
            <div className="links">
                <Link to={ROUTES.LOGIN}>Login</Link>
                <Link to={ROUTES.CANDIDATE_SIGN_UP}>Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
