import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';
import { LoginContext } from './LoginContext';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch({checkTokenApi}, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // send token as part of headers
                        },
                        // body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        navigate('/dashboard'); 
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
        <section className='bage-body'>
            <div className='profile-container'>
                {/* <h1>Your Profile</h1>
                <hr/> */}
                <div className="main-box">
                    <img alt='Profile-image' src={profileImg}/>
                    <h2>Ibrahim Adel</h2>
                {/* <div className="">
                    <h2>Ibrahim Adel</h2>
                    <p>developer</p>
                </div> */}
                </div>
                <div className='posts-box'>

                </div>
            </div>
        </section>
    </>
  )
}

export default Profile
