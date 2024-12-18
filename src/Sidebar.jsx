import React from 'react';
import { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Sidebar = () => {

    // handel variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();


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
    <>
      {isLoggedIn ? 
        <aside className={isSidebarActive ? 'active' : ''}>
            <nav>
                <ul>
                    <li><Link to='/home'><i className="fas fa-home"></i><span className="sidebar-links ">Home</span></Link></li>
                    <li><Link to='#'><i className="fas fa-cog"></i><span className="sidebar-links ">Settings</span></Link></li>
                    <li><Link to='./users'><i className="fas fa-users"></i><span className="sidebar-links ">Users</span></Link></li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <Link to='./profile'><i className="fas fa-user"></i><span className="sidebar-links ">profile</span></Link>
                <button onClick={handleLogout}><i className="fas fa-sign-out-alt"></i><span className="sidebar-links ">Logout</span></button>
            </div>
        </aside> : <></>}
    </>
  )
}

export default Sidebar
