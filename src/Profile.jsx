import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
const Profile = () => {
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);
    const [isSidebarActive] = useContext(SidebarContext);
    const [createPostApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [checkTokenApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/auth');
    const navigate = useNavigate();
    var user = null;
    const [content, setContent] = useState('');
    const [userRef, setUserRef] = useState([]);
    const [comment, setComment] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState('');

    const getPosts = async (userEmail) => {
        const token = localStorage.getItem('token');
        const postsApi = `https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts/${userEmail}`;
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
                setPosts(data);
            } else {
                alert('Error in fetching posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

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
                        user = data;
                        setUserRef(user);
                        setDateOfBirth(user.dateOfBirth);
                        setEmail(user.email);
                        setFirstName(user.firstname);
                        setLastName(user.lastname);
                        setPhoneNumber(user.phoneNumber);
                        setProfile(user.profile);
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
        const fun = async () => {
            await checkToken();
            if(user){
                await getPosts(user.email);
            }
        };
        fun();
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
                    'Authorization': `Bearer ${token}`,
                },
                body : formData,

            });
            if(response.ok){
                window.location.reload();
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

    const viewPuplisherProfile = async (userId) => {
        navigate(`/profile/${userId}`);
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
            <form className='profile-form'>
                <div className='flex-container left'>
                    <div className='profile-container'>
                        <div className="main-box">
                            <img className='image' alt={ user ? `${firstname} ${lastname}'s profile` : 'profile'} src={ profile ? profile : profileImg}/>
                        </div>
                    </div>
                    <h2>{user ? `${user.firstname} ${user.lastname}` : 'user\'s name'}</h2>
                </div>
                <div className='flex-container right'>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="firstname">firstname</label>
                        <input type="text" name="firstname" value={firstname} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="lastname">lastname</label>
                        <input type="text" name="lastname" value={lastname} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="email">email</label>
                        <input type="email" name="email" value={email} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="dateOfBirth">birth date</label>
                        <input type="date" name="dateOfBirth" value={dateOfBirth} required readOnly/>
                    </div>
                    <div className='flex-field'>
                        <label className='view-label' htmlFor="phoneNumber">phone number</label>
                        <input type="number" name="phoneNumber" value={phoneNumber} required readOnly/>
                    </div>
                    <div>
                        <Link className='update-btn' to="/profile/update">update profile</Link>
                    </div>
                </div>
            </form>
            <form className='create-post-form' onSubmit={createPost}>
                <h2>Create new post</h2>
                <label className='view-label' htmlFor="content">post content</label>
                <textarea placeholder='description. . .' name="content" value={content} onChange={(e) => setContent(e.target.value)} maxLength='500' rows='5' required/>
                <label htmlFor="image">upload image</label>
                <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}/>
                <input className='create-post-btn' type="submit" value="Create"/>
            </form>
            <div className='posts-box'>
                {posts.map((post) => (
                    <div key={post.id} className="post-box">
                        <div className='div'> 
                            <button className='user-box' onClick={() => viewPuplisherProfile(post.owner.id)}>
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
                        </div>
                        <div className = 'comments-box'>
                            {post.comments.map((comment) => (
                                <div key={comment.id} className='comment-box'>
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

export default Profile
