import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Login = () => {

    // handel variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth/login');
    const [checkTokenApi] = useState('');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();


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
                            'Authorization': `Bearer ${token}`, 
                        },
                        body: JSON.stringify({ token }),
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
            else{
                navigate('/login');
            }
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);


    // handel athontication
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(loginApi, {
        method: 'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            setIsLoggedIn(true);
            setIsSidebarActive(false);
            navigate('/profile');
        } else {
            alert('Invalid credentials');
        }
    };


    return (
        <>
            <section className='bage'>
                <form method="Post" onSubmit={handleSubmit}>
                    <h2>Login Now</h2>
                    <label htmlFor="email">enter your email:</label>
                    <input type="email" name="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                    <label htmlFor="password">enter your password:</label>
                    <input type="password" name="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                    <input type="submit" value="Login"/>
                    <div>
                        <p>Don't have an account? </p>
                        <Link to="/register">Sign up now!</Link>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
