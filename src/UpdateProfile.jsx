import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
 



const UpdateProfile = () => {
    
  // handel variables
  const apiUrl = process.env.REACT_APP_API_URL;
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
  const [profile, setProfile] = useState(null);
  const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);

  const [updateApi] = useState(`${apiUrl}/api/users/profile`);
  const [checkTokenApi] = useState(`${apiUrl}/api/auth`);
  const navigate = useNavigate();

  // handel athontication
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
                });

                if (response.ok) {
                    const data = await response.json();
                    setDateOfBirth(data.dateOfBirth);
                    setFirstName(data.firstname);
                    setLastName(data.lastname);
                    setPhoneNumber(data.phoneNumber);
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
  }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);

  // handel submet
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('phoneNumber', phoneNumber);
    if (profile) formData.append('profile', profile);
    const token = localStorage.getItem('token');
    try{
        const response = await fetch(updateApi,{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        if(response.ok){
            navigate('/profile');
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
        <section className={isSidebarActive ? ((isLoggedIn) ? `bage-body active` : `bage active`) : ((isLoggedIn) ? `bage-body` : `bage`)}>
            <form method="post" onSubmit={handleSubmit}>
                <h2>Update Profile</h2>
                <label htmlFor="firstname">update  your lastname:</label>
                <input type="text" name="firstname" placeholder="update your firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
                <label htmlFor="lastname">update  your lastname:</label>
                <input type="text" name="lastname" placeholder="update your lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
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
