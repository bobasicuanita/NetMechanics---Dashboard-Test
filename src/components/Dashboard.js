import React, { useState } from 'react';
import logoImage from '../images/logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import Welcome from './Welcome';
import Colors from './Colors';
import Users from './Users';
import Settings from './Settings';
import Navlist from './Navlist';
import Hamburger from './Hamburger';

const Dashboard = () => {

    // state management if hamburger is visible or not
    const [hamburgerVisible, setHamburgerVisible] = useState(false);

    // import current location function from react router
    const location = useLocation();

    // Depending on the current location render the correct component
    const checkRender = () => {
        switch (location.pathname) {
            case '/':
                return <Welcome />
            case '/colors':
                return <Colors />
            case '/users':
                return <Users />
            case '/settings':
                return <Settings />
            default:
                return <Welcome />
        }
    }


    // Toggle visible/not visible for the hamburger menu
    const handleHamburger = () => {
        if (!hamburgerVisible) {
            setHamburgerVisible(true);
        } else {
            setHamburgerVisible(false);
        }
    }


    return (
        <>
            <header className="header">
                <Hamburger hamburgerVisible={hamburgerVisible} handleHamburger={handleHamburger} />
                <div className="logo">
                    <Link to={{ pathname: '/Welcome' }}><img src={logoImage} alt="logo" /></Link>
                </div>
                <div className="logout-area">
                    <h4 id="dashboard">DASHBOARD</h4>
                    <div className="logout-btn">
                        <h4>LOGOUT</h4>
                        <div className="circle">
                            <PersonIcon className="icon" />
                        </div>
                    </div>
                </div>
            </header>
            <section className="nav-main-section">
                {hamburgerVisible ? <Navlist /> : null}
                <nav id="navigation" className="nav">
                    <ul className="nav-list">
                        <Link className="link" to={{ pathname: '/colors' }}><li className="nav-list-item">Colors</li></Link>
                        <Link className="link" to={{ pathname: '/users' }}><li className="nav-list-item">Users</li></Link>
                        <Link className="link" to={{ pathname: '/settings' }}><li className="nav-list-item">Settings</li></Link>
                    </ul>
                </nav>
                <main className="main">
                    {checkRender()}
                </main>
            </section>
            <footer className="footer">
                <span>
                    &#169; 2020 Netmechanics
            </span>
            </footer>
        </>
    );
};

export default Dashboard;
