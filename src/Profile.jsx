import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
const Profile = () => {
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(checkTokenApi, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // send token as part of headers
                        },
                        // body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setUser(data);
                    } else {
                        setIsLoggedIn(false);
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);
  return (
    <>
        <section className='bage-body '>
            <form className='profile-container'>
            <div className='profile-container'>
                <div className="main-box">
                    <img alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                </div>
                </div>
                <h2>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h2>
                <label htmlFor="firstname">firstname:</label>
                <input type="text" name="firstname" value={user ? `${user.firstname}` : ''} required readOnly/>
                <label htmlFor="lastname">lastname:</label>
                <input type="text" name="lastname" value={user ? `${user.lastname}` : ''} required readOnly/>
                <label htmlFor="email">email:</label>
                <input type="email" name="email" value={user ? `${user.email}` : ''} required readOnly/>
                <label htmlFor="dateOfBirth">birth date:</label>
                <input type="date" name="dateOfBirth" value={user ? `${user.dateOfBirth}` : ''} required readOnly/>
                <label htmlFor="phoneNumber">phone number:</label>
                <input type="number" name="phoneNumber" value={user ? `${user.phoneNumber}` : ''} required readOnly/>
                <div>
                    <Link to="/profile/update">update profile</Link>
                </div>
            </form>
            <div className='posts-box'>
            </div>
        </section>
    </>
  )
}

export default Profile
