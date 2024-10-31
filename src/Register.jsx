// import React from 'react';
// import {Link, useNavigate } from 'react-router-dom';
// import { useState, useContext, useEffect } from 'react';

// import { LoginContext } from './LoginContext';
// import { SidebarContext } from './SidebarContext';

// const Register = () => {

//     // handel variables
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [verfiedPassword, setVerfiedPassword] = useState('');
//     const [registerApi] = useState('');
//     const [checkTokenApi] = useState('');
//     const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
//     const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
//     const navigate = useNavigate();
//     console.log(email, password);


//     // handel verfing token
//     useEffect(() => {
//         const checkToken = async () => {
//             if (isLoggedIn) {
//                 const token = localStorage.getItem('token');
//                 try {
//                     const response = await fetch({checkTokenApi}, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`, // send token as part of headers
//                         },
//                         body: JSON.stringify({ token }),
//                     });

//                     if (response.ok) {
//                         navigate('/dashboard'); //الراوت اللي هو فيه من قبل كدا
//                     } else {
//                         setIsLoggedIn(false);
//                         localStorage.removeItem('token');
//                         navigate('/login');
//                     }
//                 } catch (error) {
//                     console.error('Error verifying token:', error);
//                     setIsLoggedIn(false);
//                     localStorage.removeItem('token');
//                     navigate('/login');
//                 }
//             }
//         };
//         checkToken();
//     }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);
    

//     // handel athontication
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch({registerApi}, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, verfiedPassword }),
//         });

//         if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token); 
//         setIsLoggedIn(true);
//         setIsSidebarActive(false);
//         navigate('/dashboard');
//         } else {
//         alert('Invalid credentials');
//         }
//     };


//   return (
//     <>
//         <section className='bage'>
//             <form method="post" onSubmit={handleSubmit}>
//                 <h2>Register</h2>
//                 <label htmlFor="name">Enter your name:</label>
//                 <input type="text" name="name" placeholder="enter your name" onChange={(e) => setName(e.target.value)} required/>
//                 <label htmlFor="email">Enter your email:</label>
//                 <input type="email" name="email" placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} required/>
//                 <label htmlFor="password">Enter your password:</label>
//                 <input type="password" name="password" placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} required/>
//                 <label htmlFor="verfied-password">Verify the password:</label>
//                 <input type="password" name="verfied-password" placeholder="verify the password" onChange={(e) => setVerfiedPassword(e.target.value)} required/>
//                 <input type="submit" value="Register"/>
//                 <div>
//                     <p>already have an account? </p>
//                     <Link to="/login">Login!</Link>
//                 </div>
//             </form>
//         </section>
//     </>
//   )
// }

// export default Register
import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';

const Register = () => {

    // handel variables
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender , setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // const [registerApi] = useState('https://fictional-space-acorn-w6p64gx55qj3g6pv-4000.app.github.dev/api/auth/register');
    // const [registerApi] = useState('http://localhost:8000/api/sir/register');
    const [registerApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth/register');
    const [checkTokenApi] = useState('https://fictional-space-acorn-w6p64gx55qj3g6pv-4000.app.github.dev/api/auth');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const navigate = useNavigate();
    console.log(email, password);


    // handel verfing token
    // useEffect(() => {
    //     const checkToken = async () => {
    //         if (isLoggedIn) {
    //             const token = localStorage.getItem('token');
    //             try {
    //                 const response = await fetch(checkTokenApi, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`, // send token as part of headers
    //                     },
    //                     body: JSON.stringify({ token }),
    //                 });

    //                 if (response.ok) {
    //                     navigate('/profile'); //الراوت اللي هو فيه من قبل كدا
    //                 } else {
    //                     setIsLoggedIn(false);
    //                     localStorage.removeItem('token');
    //                     navigate('/login');
    //                 }
    //             } catch (error) {
    //                 console.error('Error verifying token:', error);
    //                 setIsLoggedIn(false);
    //                 localStorage.removeItem('token');
    //                 navigate('/login');
    //             }
    //         }
    //     };
    //     checkToken();
    // }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);
    

    // handel athontication
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth/register', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ firstname, lastname, email, password, confirmPassword, gender, dateOfBirth, phoneNumber }),
        // });
        // console.log(response);
        // if (response.ok) {
        // const data = await response.json();
        // localStorage.setItem('token', data.token); 
        // setIsLoggedIn(true);
        // setIsSidebarActive(false);
        // navigate('/profile');
        // } else {
        //     const errorData = await response.json();
        //     console.error('Error:', errorData);
        //     alert('Invalid credentials');
        // }
        try{
            const response = await fetch(registerApi,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                credentials:"include",
                body: JSON.stringify({ firstname, lastname, email, password, confirmPassword, gender, dateOfBirth, phoneNumber })
            });
            console.log(response);
            if(response.ok){
                const data = await response.json(); // استرجاع النص من الرد
                console.log(data); // التأكد من أن الرد هو "User Created"
                // localStorage.setItem('token', message); 
                // setIsLoggedIn(true);
                // setIsSidebarActive(false);
                // navigate('/profile');
            }
            else{
                const errorData = await response.json();
                console.error('Error:', errorData);
                // alert('Invalid credentials');
            }
        }
        catch(error){
            console.error('Error:', error);
        }
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        //     if(data){
        //         // alert("succseeful");
        //         // navigate('/dashbord', { state: data});
        //         // url=url+data.id;
        //         // navigate(url);
        //         console.log(1);
        //     }
        //     else{
        //         console.log(2);

        //         alert("TRY AGAIN!");
        //     }
        // })
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
                <input type="text" name="gender" placeholder="gender" onChange={(e) => setGender(e.target.value)} required/>
                <label htmlFor="dateOfBirth">dateOfBirth:</label>
                <input type="date" name="dateOfBirth" placeholder="dateOfBirth" onChange={(e) => setDateOfBirth(e.target.value)} required/>
                <label htmlFor="phoneNumber">phoneNumber:</label>
                <input type="number" name="phoneNumber" placeholder="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} required/>

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
