import React from 'react';
import { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Sidebar = () => {

  const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();


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
    <>
      {isLoggedIn ? 
        <aside className={isSidebarActive ? 'active' : ''}>
            <nav>
                <ul>
                    <li><Link to='/'><i className="fas fa-home"></i><span className="sidebar-links ">Home</span></Link></li>
                    {/* <li><Link to='./'><i className="fas fa-info-circle"></i><span className="sidebar-links ">About</span></Link></li> */}
                    {/* <li><Link to='./'><i className="fas fa-book"></i><span className="sidebar-links ">Courses</span></Link></li> */}
                    {/* <li><Link to='./'><i className="fas fa-users"></i><span className="sidebar-links ">Teachers</span></Link></li> */}
                    {/* <li><Link to='./'><i className="fas fa-headset"></i><span className="sidebar-links ">Contact us</span></Link></li> */}
                    <li><Link to='#'><i className="fas fa-cog"></i><span className="sidebar-links ">Settings</span></Link></li>
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
