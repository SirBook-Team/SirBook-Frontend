import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';


import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';



const Main = () => {

    const [posts, setPosts] = useState([]);
    const [error, ] = useState(null);
    const [userRef, setUserRef] = useState([]);
    const [comment, setComment] = useState('');
    const [postsApi, ] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive, ] = useContext(SidebarContext);
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
                        setUserRef(data);
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
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response);
            if(response.ok){
                window.location.reload();
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

    const createComment = async (postId) => {
        console.log(postId);
        const token = localStorage.getItem('token');
        const createCommentApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/comment/${postId}`;
        try{
            const response = await fetch(createCommentApi,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: comment }),
            });
            console.log(response);
            if(response.ok){
                window.location.reload();
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

    const deleteComment = async (commentId) => {
        console.log(commentId);
        const token = localStorage.getItem('token');
        const deleteCommentApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/comment/delete/${commentId}`;
        try{
            const response = await fetch(deleteCommentApi,{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response);
            if(response.ok){
                window.location.reload();
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

    const addReact = async (postId) => {
        console.log(postId);
        const token = localStorage.getItem('token');
        const addReactApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/react/${postId}`;
        try{
            const response = await fetch(addReactApi,{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response);
            if(response.ok){
                window.location.reload();
            }
            else{
                alert('error in delete post');
            }
        }
        catch(error){
            console.error('Error: ', error);
            alert('Server Error');
        };
    };


  return (
    <>
        <section className={isSidebarActive ? 'bage-body active' : 'bage-body'}>
        <div className='posts-box'>
                {posts.map((post) => (
                        <div key={post.id} className="post-box">
                            <div className='div'> 
                                <button className='user-box' onClick={() => viewPuplisherProfile(post.owner.email, post.owner.firstname, post.owner.lastname, post.owner.profile)}>
                                    <img className='user-post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ (post && post.owner && post.owner.profile) ? post.owner.profile : profileImg}/>
                                    <h3>{(post && post.owner) ? `${post.owner.firstname} ${post.owner.lastname}` : 'user\'s name'}</h3>
                                </button>
                                {post.owner.email === userRef?.email && (
                                    <button className='cross-btn' onClick={() => deletePost(post.id)}><i className="fas fa-times"></i></button>
                                )}
                            </div>
                            <p>{(post && post.content) ? `${post.content}` : ``}</p>
                            {(post && post.image) && <img className='post-img' alt={ post ? `${post.owner.firstname} ${post.owner.lastname}'s profile` : 'profile'} src={ post.image}/>}
                            <div className = 'create-comment'>
                                <textarea placeholder='comment. . .' name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required maxLength='200' rows='2'/>
                                <button className = 'post-btn' onClick={() => createComment(post.id)}>Post</button>
                            </div>
                            <div className='view-likes'>
                                <div>
                                    <span>{post.reacts.length}</span>
                                </div>
                                <div>
                                    <button className={post.reacts.find(react => react.email === userRef.email) ? 'like-btn active' : 'like-btn'} onClick={() => addReact(post.id)}><i className="fas fa-thumbs-up"></i></button>
                                </div>
                                {/* <button className='like-btn'><i className="fas fa-thumbs-down"></i></button>
                                <button className='like-btn'><i className="fas fa-heart"></i></button> */}
                            </div>
                            <div className = 'comments-box'>
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className='comment-box'>
                                        {/* <hr/> */}
                                        <div className='div'>
                                            <button className='user-box' onClick={() => viewPuplisherProfile(comment.owner.email, comment.owner.firstname, comment.owner.lastname, comment.owner.profile)}>
                                                <img className='user-post-img' alt={ comment ? `${comment.owner.firstname} ${comment.owner.lastname}'s profile` : 'profile'} src={ (comment && comment.owner && comment.owner.profile) ? comment.owner.profile : profileImg}/>
                                                <h3>{(comment && comment.owner) ? `${comment.owner.firstname} ${comment.owner.lastname}` : 'user\'s name'}</h3>
                                            </button>
                                            {comment.owner.email === userRef?.email && (
                                                <button className='cross-comment-btn' onClick={() => deleteComment(comment.id)}>
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                        <p>{(comment && comment.content) ? `${comment.content}` : ``}</p>
                                        {/* <hr/> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    </>
  )
}

export default Main
