import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand"><h6>Home</h6></Link>
                    <Link to="/login" className="navbar-brand"><h6>Login</h6></Link>
                    <Link to="/reservation" className="navbar-brand"><h6>Reserve Parking</h6></Link>
                </div>

                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup"><h6>Sign Up</h6></Link></li>
                        <li><Link to="/logout"><h6>Logout</h6></Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}