import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
const UserProfile = () => {

    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive] = useContext(SidebarContext);
    // const [createPostApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // const [content, setcontent] = useState('');
    // const [firstname, setFirstName] = useState('');
    // const [lastname, setLastName] = useState('');
    // const [email] = useState('');
    // const [dateOfBirth, setDateOfBirth] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');

    const getPosts = async () => {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const postsApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/${userEmail}`;
        console.log(postsApi);
        try {
            console.log(1);
            const response = await fetch(postsApi, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            console.log(response);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPosts(data);
            } else {
                console.log(2);
                alert('Error in fetching posts');
            }
        } catch (error) {
            console.log(3);
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                console.log(token);
                try {
                    const response = await fetch(checkTokenApi, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                        },
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
            else{
                navigate('/login');
            }
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);

    
    
    // const viewPuplisherProfile = async (userEmail, firstname, lastname) => {
    //     const token = localStorage.getItem('token');
    //     const viewProfileApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/users/${userEmail}`;
    //     try{
    //         const response = await fetch(viewProfileApi,{
    //             method:"GET",
    //             headers:{
    //                 // "Content-Type":"application/json",
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //         });
    //         console.log(response);
    //         if(response.ok){
    //             localStorage.setItem('userEmail', `${userEmail}`);
    //             navigate(`/profile/${firstname}${lastname}`);
    //         }
    //         else{
    //             alert('error');
    //         }
    //     }
    //     catch(error){
    //         console.error('Error: ', error);
    //         alert('Server Error');
    //     }
    // };

  return (
    <>
      <section className={isSidebarActive ? 'bage-body active' : 'bage-body'}>
            <form className='profile-form'>
                <div className='flex-container left'>
                    <div className='profile-container'>
                        <div className="main-box">
                            <img className='image' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={localStorage.getItem('image')}/>
                            {/* <img className='image' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ user && user.profile ? user.profile : profileImg}/> */}
                        </div>
                    </div>
                    <h2>{`${fname} ${lname}`}</h2>
                    {/* <h2>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h2> */}
                    {/* <h2>{localStorage.getItem('userEmail')}</h2> */}
                </div>
            </form>
            <div className='posts-box'>
                {posts.map((post) => (
                    <div key={post.id} className="post-box">
                        <div>
                            {/* <button className='user-box' onClick={viewPuplisherProfile}>
                                <img className='user-post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ (post && post.owner && post.owner.profile) ? post.owner.profile : profileImg}/>
                                <h3>{(post && post.owner) ? `${post.owner.firstname} ${post.owner.lastname}` : 'user\'s name'}</h3>
                            </button> */}
                            {/* <button className='cross-btn' onClick={() => deletePost(post.id)}><i className="fas fa-times"></i></button> */}
                        </div>
                        <p>{(post && post.content) ? `${post.content}` : ``}</p>
                        {(post && post.image) && <img className='post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ post.image}/>}
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default UserProfile
