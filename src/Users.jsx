import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
 

const Users = () => {
    
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive] = useContext(SidebarContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [userRef, setUserRef] = useState([]);
    const [checkTokenApi] = useState(`${apiUrl}/api/auth`);
     

    // handel going to user profile
    const viewPuplisherProfile = async (userId) => {
        navigate(`/profile/${userId}`);
    };

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
                            'Authorization': `Bearer ${token}`, 
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                        setUserRef(data);
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

        async function makeAll() {
            await checkToken();
        }
        makeAll();
        
    }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);

    
    // handel get all posts
    useEffect(() => {
        const getPosts = async () => {
            await searchUsers("");
        };
        getPosts();
    }, []);


    const searchUsers = async (text_search) => {
        const token = localStorage.getItem('token');
        const searchApi = `${apiUrl}/api/users/`;
        try{
            const response = await fetch(searchApi,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text_search: text_search }),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setUsers(data);
            }
            else{
                console.error('error');
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
                {location.pathname === '/users' ? (
                    <form className='search-form'>
                    <div>
                        <input type="text" placeholder="Search" onChange={ async(e)=>{
                            await searchUsers(e.target.value);
                        } } />
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
                ) : null }
                <div className='users'>
                    {users.map((user) => (
                        <div key={user.id} className='post-box'>
                            {/* <div className='div'> */}
                                <button className='user-box' onClick={() => viewPuplisherProfile(user.id)}>
                                    <img className='users-img' alt={ user ? `${user.firstname} ${user.lastname}'s profile` : 'profile'} src={ (user && user.profile) ? user.profile : profileImg}/>
                                    <h3>{(user) ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h3>
                                </button>
                            {/* </div> */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Users
