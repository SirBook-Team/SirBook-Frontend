import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { LoginContext } from './LoginContext';
// import { SidebarContext } from './SidebarContext';


const UpdateProfile = () => {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
  const [profile, setProfile] = useState(null);
  // const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);

  const [updateApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/users/profile/');
  const [checkTokenApi] = useState('https://fictional-space-acorn-w6p64gx55qj3g6pv-4000.app.github.dev/api/auth');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkToken = async () => {
  //       if (isLoggedIn) {
  //           const token = localStorage.getItem('token');
  //           try {
  //               const response = await fetch(checkTokenApi, {
  //                   method: 'GET',
  //                   headers: {
  //                       'Content-Type': 'application/json',
  //                       'Authorization': `Bearer ${token}`, // send token as part of headers
  //                   },
  //                   // body: JSON.stringify({ token }),
  //               });

  //               if (response.ok) {
  //                   const data = await response.json();
  //                   console.log(data);
  //                   console.log('OK');
  //               } else {
  //                   setIsLoggedIn(false);
  //                   localStorage.removeItem('token');
  //                   navigate('/login');
  //               }
  //           } catch (error) {
  //               console.error('Error verifying token:', error);
  //               setIsLoggedIn(false);
  //               localStorage.removeItem('token');
  //               navigate('/login');
  //           }
  //       }
  //   };
  //   checkToken();
  // }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(firstname, lastname, email, dateOfBirth, phoneNumber, profile);
    // formData.append('firstname', firstname);
    // formData.append('lastname', lastname);
    // formData.append('email', email);
    // formData.append('dateOfBirth', dateOfBirth);
    // formData.append('phoneNumber', phoneNumber);
    if (profile) formData.append('profile', profile);
    const token = localStorage.getItem('token');
    console.log(token);
    try{
        const response = await fetch(updateApi,{
            method:"POST",
            headers:{
                // "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`,
            },
            // body: JSON.stringify({ firstname, lastname, email, dateOfBirth, phoneNumber, profile })
            body: formData,
        });
        console.log(response);
        if(response.ok){
            navigate('/profile');
        }
        else{
            console.log(1);
            alert(await response.text());
        }
    }
    catch(error){
        console.log(2);
        console.error('Error: ', error);
        alert('Server Error');
    }
  };

  return (
    <>
        <section className="bage-body">
            <form method="post" onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <label htmlFor="firstname">update  your lastname:</label>
                <input type="text" name="firstname" placeholder="update your firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
                <label htmlFor="lastname">update  your lastname:</label>
                <input type="text" name="lastname" placeholder="update your lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
                <label htmlFor="email">your name:</label>
                <input type="email" name="email" placeholder="your email" value={email} required readOnly/>
                {/* <label htmlFor="previous-password">previous password:</label> */}
                {/* <input type="password" name="previous-password" placeholder="enter your old password" required/> */}
                {/* <label htmlFor="new-password">new password:</label> */}
                {/* <input type="password" name="new-password" placeholder="enter your new password" required/> */}
                {/* <label htmlFor="confirm-password">confirm password:</label> */}
                {/* <input type="password" name="confirm-password" placeholder="confirm your new password" required/> */}
                <label htmlFor="dateOfBirth">update  your birth date:</label>
                <input type="date" name="dateOfBirth" placeholder="update  your birth date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
                <label htmlFor="phoneNumber">update  your phone number:</label>
                <input type="number" name="phoneNumber" placeholder="update  your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                <label htmlFor="profile">update pic:</label>
                <input type="file" name="profile" onChange={(e) => setProfile(e.target.files[0])}/>
                <input type="submit" value="Update Profile"/>
                <div>
                </div>
            </form>
        </section>
    </>
  )
}

export default UpdateProfile
