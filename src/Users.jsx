import React from 'react'
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
const Users = () => {

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive] = useContext(SidebarContext);
    const location = useLocation();
    const navigate = useNavigate();

    // handel going to user profile
    const viewPuplisherProfile = async (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <>
            <section className={isSidebarActive ? ((isLoggedIn) ? `bage-body active` : `bage active`) : ((isLoggedIn) ? `bage-body` : `bage`)}>
                {location.pathname === '/users' ? (
                    <form className='search-form'>
                    <div>
                        <input type="text" placeholder="Search" />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </form>
                ) : null }
                <div className='users'>
                    <div className='user'>
                        <div>
                        <button className='user-box' onClick={() => viewPuplisherProfile()}>
                            <img className='user-post-img' alt={'hi'} src={'hi'}/>
                            <h3>{}</h3>
                        </button>
                        </div>
                        <div>
                        <button className='user-box' onClick={() => viewPuplisherProfile()}>
                            <img className='user-post-img' alt={'hi'} src={'hi'}/>
                            <h3>{}</h3>
                        </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Users
