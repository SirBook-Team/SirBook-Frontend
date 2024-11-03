import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './sir_light3.svg';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Navbar = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsSidebarActive((prev) => !prev);
  };


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
            navigate('/login');
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
            {/* {isLoggedIn ? <i className="fas fa-bars menu-btn" onClick={toggleSidebar}></i> : <></>} */}
            <i className="fas fa-bars menu-btn" onClick={toggleSidebar}></i>
            <Link className='logo-box' to="/">
                <img className='logo' src={logo} alt="Logo" />
                <h2>SirBook</h2>
            </Link>
        </div>
        <ul>
            {isLoggedIn ? (
            <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </>
            ) : (
            <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </>
            )}
        </ul>
    </nav>
  );
}

export default Navbar;