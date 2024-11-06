import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './sir_light3.svg';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Navbar = () => {

    // handel variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();

    // handel sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarActive((prev) => !prev);
    };

    // handel logout
    const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const getUserApi = `${apiUrl}/api/auth/logout`;
    try {
        const response = await fetch(getUserApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });
        if (response.ok) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setIsSidebarActive(false);
            navigate('/');
        } else {
            console.error('Error in logout');
        }
    } catch (error) {
        console.error('Error fetching logout:', error);
    }
};



  return (
    <nav className='navbar'>
        <div className='brand'>
            <i className="fas fa-bars menu-btn" onClick={toggleSidebar}></i>
            <Link className='logo-box' to={isLoggedIn ? `/home`: `/`}>
                <img className='logo' src={logo} alt="Logo" />
                <h2>SirBook</h2>
            </Link>
        </div>
        <ul>
            {isLoggedIn ? (
            <>
                <li><Link to="/home">Home</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </>
            ) : (
            <>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </>
            )}
        </ul>
    </nav>
  );
}

export default Navbar;