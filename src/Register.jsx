import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { SidebarContext } from './SidebarContext';
import { LoginContext } from './LoginContext';
 


const Register = () => {

    // handel variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender , setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [registerApi] = useState(`${apiUrl}/api/auth/register`);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);



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
                        navigate('/register');
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    navigate('/register');
                }
            }
            else{
                navigate('/register');
            }
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn]);

    // handel submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(registerApi,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({ firstname, lastname, email, password, confirmPassword, gender, dateOfBirth, phoneNumber })
            });
            if(response.ok){
                setIsSidebarActive(false);
                navigate('/');
            }
            else{
                console.error(await response.text());
            }
        }
        catch(error){
            console.error('Error: ', error);
            console.error('Server Error');
        }
    };


  return (
    <>
        <section className='bage'>
            <form method="post" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label htmlFor="firstname">Enter your firstname:</label>
                <input type="text" name="firstname" placeholder="enter your firstname" onChange={(e) => setFirstName(e.target.value)} required/>
                <label htmlFor="lastname">Enter your lastname:</label>
                <input type="text" name="lastname" placeholder="enter your lastname" onChange={(e) => setLastName(e.target.value)} required/>
                <label htmlFor="email">Enter your email:</label>
                <input type="email" name="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="password">Enter your password:</label>
                <input type="password" name="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                <label htmlFor="confirmPassword">Verify the password:</label>
                <input type="password" name="confirmPassword" placeholder="verify the password" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <label htmlFor="gender">gender:</label>
                <div className='radio-div'>
                    <div>
                        <input type="radio" name='gender' onChange={(e) => setGender(e.target.value)} value='male' checked={gender === "male"} required/><span>male</span>
                    </div>
                    <div>
                        <input type="radio" name='gender' onChange={(e) => setGender(e.target.value)} value='female' checked={gender === "female"} required/><span>female</span>
                    </div>
                </div>
                <label htmlFor="dateOfBirth">dateOfBirth:</label>
                <input type="date" name="dateOfBirth" placeholder="dateOfBirth" onChange={(e) => setDateOfBirth(e.target.value)} required/>
                <label htmlFor="phoneNumber">phoneNumber:</label>
                <input type="number" name="phoneNumber" placeholder="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} required/>
                <input type="submit" value="Register"/>
                <div>
                    <p>already have an account? </p>
                    <Link to="/">Login!</Link>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
