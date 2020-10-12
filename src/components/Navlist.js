import React from 'react';
import { Link } from 'react-router-dom';

const Navlist = (props) => {
    return (
        <>
            <nav id="navlist" className="nav">
                <ul className="nav-list">
                    <Link className="link" to={{ pathname: '/colors' }}><li className="nav-list-item">Colors</li></Link>
                    <Link className="link" to={{ pathname: '/users' }}><li className="nav-list-item">Users</li></Link>
                    <Link className="link" to={{ pathname: '/settings' }}><li className="nav-list-item">Settings</li></Link>
                </ul>
            </nav>
        </>
    )

};

export default Navlist;