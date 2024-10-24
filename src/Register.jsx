import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Register = () => {

    // handel variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verfiedPassword, setVerfiedPassword] = useState('');
    const [registerApi] = useState('');
    const [checkTokenApi] = useState('');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();
    console.log(email, password);


    // handel verfing token
    useEffect(() => {
        const checkToken = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch({checkTokenApi}, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // send token as part of headers
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        navigate('/dashboard'); //الراوت اللي هو فيه من قبل كدا
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
    

    // handel athontication
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch({registerApi}, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, verfiedPassword }),
        });

        if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
        setIsLoggedIn(true);
        setIsSidebarActive(false);
        navigate('/dashboard');
        } else {
        alert('Invalid credentials');
        }
    };


  return (
    <>
        <section className='bage'>
            <form method="post" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="name">Enter your name:</label>
                <input type="text" name="name" placeholder="enter your name" onChange={(e) => setName(e.target.value)} required/>
                <label htmlFor="email">Enter your email:</label>
                <input type="email" name="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="password">Enter your password:</label>
                <input type="password" name="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                <label htmlFor="verfied-password">Verify the password:</label>
                <input type="password" name="verfied-password" placeholder="verify the password" onChange={(e) => setVerfiedPassword(e.target.value)} required/>
                <input type="submit" value="Register"/>
                <div>
                    <p>already have an account? </p>
                    <Link to="/login">Login!</Link>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
