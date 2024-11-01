import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
const Profile = () => {
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const [createPostApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [content, setcontent] = useState('');
    // const [firstname, setFirstName] = useState('');
    // const [lastname, setLastName] = useState('');
    // const [email] = useState('');
    // const [dateOfBirth, setDateOfBirth] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);

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

    const createPost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', content);
        if (image) formData.append('image', image);
        try{
            const response = await fetch(createPostApi,{
                method:"POST",
                headers:{
                    // "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify({ firstname, lastname, email, password, confirmPassword, gender, dateOfBirth, phoneNumber })
                body : formData,

            });
            console.log(response);
            if(response.ok){
                navigate('/profile');
            }
            else{
                alert('error');
            }
        }
        catch(error){
            console.error('Error: ', error);
            alert('Server Error');
        }
    };

    const viewPuplisherProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('content', content);
        if (image) formData.append('image', image);
        try{
            const response = await fetch(createPostApi,{
                method:"POST",
                headers:{
                    // "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify({ firstname, lastname, email, password, confirmPassword, gender, dateOfBirth, phoneNumber })
                body : formData,

            });
            console.log(response);
            if(response.ok){
                navigate('/profile');
            }
            else{
                alert('error');
            }
        }
        catch(error){
            console.error('Error: ', error);
            alert('Server Error');
        }
    };

  return (
    <>
        <section className={isSidebarActive ? 'bage-body active' : 'bage-body'}>
            <form className='profile-form'>
                <div className='flex-container left'>
                    <div className='profile-container'>
                        <div className="main-box">
                            <img className='image' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                        </div>
                    </div>
                    <h2>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h2>
                </div>
                <div className='flex-container right'>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="firstname">firstname</label>
                        <input type="text" name="firstname" value={user ? `${user.firstname}` : ''} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="lastname">lastname</label>
                        <input type="text" name="lastname" value={user ? `${user.lastname}` : ''} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="email">email</label>
                        <input type="email" name="email" value={user ? `${user.email}` : ''} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="dateOfBirth">birth date</label>
                        <input type="date" name="dateOfBirth" value={user ? `${user.dateOfBirth}` : ''} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="phoneNumber">phone number</label>
                        <input type="number" name="phoneNumber" value={user ? `${user.phoneNumber}` : ''} required readOnly/>
                    </div>
                    <div>
                        <Link className='update-btn' to="/profile/update">update profile</Link>
                    </div>
                </div>
            </form>
            <form className='create-post-form' onSubmit={createPost}>
                <h2>Create new post</h2>
                <label className='view-label' htmlFor="content">post content</label>
                <textarea placeholder='description. . .' name="content" value={content} onChange={(e) => setcontent(e.target.value)} required maxLength='500' rows='5'/>
                {/* <input type="text" name="content" value={content} onChange={(e) => setcontent(e.target.value)} required/> */}
                <label htmlFor="image">upload image</label>
                <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                <input className='create-post-btn' type="submit" value="Create"/>
            </form>
            <div className='posts-box'>
                <div className='post-box'>
                    <button className='user-box' onClick={viewPuplisherProfile}>
                        <img className='user-post-img' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                        <h3>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h3>
                    </button>
                    <p>The evolution of technology has reshaped nearly every aspect of our lives, from how we communicate to how we work, learn, and entertain ourselves. The constant advancements in digital tools have made information and services more accessible, bridging gaps that once seemed insurmountable. Innovations like artificial intelligence, cloud computing, and mobile technology have redefined business models, enabling companies to reach global audiences and offer highly personalized experiences. However, with these benefits come challenges, including data privacy concerns and the need for digital literacy. As technology continues to evolve, it presents both opportunities and responsibilities, urging society to adopt these tools thoughtfully and ethically for a better future.</p>
                    <img className='post-img' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                </div>
                <div className='post-box'>
                    <button className='user-box' onClick={viewPuplisherProfile}>
                        <img className='user-post-img' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                        <h3>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h3>
                    </button>
                    <p>The evolution of technology has reshaped nearly every aspect of our lives, from how we communicate to how we work, learn, and entertain ourselves. The constant advancements in digital tools have made information and services more accessible, bridging gaps that once seemed insurmountable. Innovations like artificial intelligence, cloud computing, and mobile technology have redefined business models, enabling companies to reach global audiences and offer highly personalized experiences. However, with these benefits come challenges, including data privacy concerns and the need for digital literacy. As technology continues to evolve, it presents both opportunities and responsibilities, urging society to adopt these tools thoughtfully and ethically for a better future.</p>
                    <img className='post-img' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/>
                </div>
            </div>
        </section>
    </>
  )
}

export default Profile
