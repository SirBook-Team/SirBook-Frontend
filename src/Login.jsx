import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';



import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Login = () => {

    // handel variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginApi] = useState(`${apiUrl}/api/auth/login`);
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userRef, setUserRef] = useState([]);
    

    // handel athontication
    useEffect(() => {
        const checkToken = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                const checkTokenApi = `${apiUrl}/api/auth`;
                try {
                    const response = await fetch(checkTokenApi, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        },
                    });
                    if (response.ok) {
                        navigate('/profile');
                    } else {
                        setIsLoggedIn(false);
                        localStorage.removeItem('token');
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }
            else{
                navigate('/');
            }
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn]);

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
            console.error('Invalid credentials');
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
