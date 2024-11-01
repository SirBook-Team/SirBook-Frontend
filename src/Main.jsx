import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';


import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';



const Main = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postsApi, setPostsApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, setIsSidebarActive] = useContext(SidebarContext);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');


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

    useEffect(() => {
        const getPosts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(postsApi, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setPosts(data);
                } else {
                    // console.error('response not ok:', error);
                    alert('error in fetching posts');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        getPosts();
    }, [isLoggedIn, postsApi, setPosts, error]);

    const viewPuplisherProfile = async (userEmail, firstname, lastname, image) => {
        // const token = localStorage.getItem('token');
        // const viewProfileApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/users/${userEmail}`;
        // try{
        //     const response = await fetch(viewProfileApi,{
        //         method:"GET",
        //         headers:{
        //             // "Content-Type":"application/json",
        //             'Authorization': `Bearer ${token}`,
        //         },
        //     });
        //     console.log(response);
        //     if(response.ok){
        //         localStorage.setItem('userEmail', `${userEmail}`);
        //         navigate(`/profile/${firstname}${lastname}`);
        //     }
        //     else{
        //         alert('error');
        //     }
        // }
        // catch(error){
        //     console.error('Error: ', error);
        //     alert('Server Error');
        // }
        localStorage.setItem('userEmail', `${userEmail}`);
        localStorage.setItem('fname', `${firstname}`);
        localStorage.setItem('lname', `${lastname}`);
        localStorage.setItem('image', `${image}`);
        navigate(`/profile/${firstname}${lastname}`);
    };

    const deletePost = async (postId) => {
        console.log(postId);
        const token = localStorage.getItem('token');
        const deletePostApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/delete/${postId}`;
        console.log(deletePostApi);
        try{
            const response = await fetch(deletePostApi,{
                method:"POST",
                headers:{
                    // "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response);
            if(response.ok){
                navigate('/main');
            }
            else{
                alert('error in delete post');
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
            <div className='posts-box'>
                {posts.map((post) => (
                    <div key={post.id} className="post-box">
                        <div>
                            <button className='user-box' onClick={() => viewPuplisherProfile(post.owner.email, post.owner.firstname, post.owner.lastname, post.owner.profile)}>
                                <img className='user-post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ (post && post.owner && post.owner.profile) ? post.owner.profile : profileImg}/>
                                <h3>{(post && post.owner) ? `${post.owner.firstname} ${post.owner.lastname}` : 'user\'s name'}</h3>
                            </button>
                            <button className='cross-btn' onClick={() => deletePost(post.id)}><i className="fas fa-times"></i></button>
                        </div>
                        <p>{(post && post.content) ? `${post.content}` : ``}</p>
                        {(post && post.image) && <img className='post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ post.image}/>}
                    </div>
                ))}
                {/* <div className='post-box'>
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
                    <div className='post-comments'>
                        <div className='create-comment'>

                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    </>
  )
}

export default Main
