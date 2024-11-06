import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileImg from './images/profile.png';

import { LoginContext } from './LoginContext';
import { SidebarContext } from './SidebarContext';
import Notfound from './Notfound';

const UserProfile = () => {

    // handel variables
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [isSidebarActive] = useContext(SidebarContext);
    const [comment, setComment] = useState('');
    const checkTokenApi = `${apiUrl}/api/auth`;
    const navigate = useNavigate();
    const [userRef, setUserRef] = useState(null);
    const [otherUserRef, setOtherUserRef] = useState(null);
    const [posts, setPosts] = useState([]);
    const { userId } = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reacts, setReacts] = useState({});
    const [reactsCount, setReactsCount] = useState({});
    const [isReacting, setIsReacting] = useState({});

    // handel get user posts
    const getPosts = async (userEmail) => {
        const token = localStorage.getItem('token');
        const postsApi = `${apiUrl}/api/posts/${userEmail}`;
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
                console.error('Error in fetching posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // handel get user
    const getUser = async () => {
        const token = localStorage.getItem('token');
        const getUserApi = `${apiUrl}/api/users/${userId}`;
        try {
            const response = await fetch(getUserApi, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOtherUserRef(data);
            } else {
                console.error('Error in fetching user');
                setError(true);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
        if (error) {
            navigate('/notfound');
        }
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
            } else {
                navigate('/');
            }
            await getUser();
        };
        checkToken();
    }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);

    useEffect(() => {
        if (otherUserRef) {
            getPosts(otherUserRef.email);
        }
    }, [otherUserRef]);

    // handel delete post
    const deletePost = async (postId) => {
        const token = localStorage.getItem('token');
        const deletePostApi = `${apiUrl}/api/posts/delete/${postId}`;
        try {
            const response = await fetch(deletePostApi, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('error in delete post');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // handel create new comment
    const createComment = async (postId) => {
        const token = localStorage.getItem('token');
        const createCommentApi = `${apiUrl}/api/posts/comment/${postId}`;
        try {
            const response = await fetch(createCommentApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: comment }),
            });
            if (response.ok) {
                setComment(''); // Clear the comment input after posting
                window.location.reload();
            } else {
                console.error('error in create comment');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // handel delete comment
    const deleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        const deleteCommentApi = `${apiUrl}/api/posts/comment/delete/${commentId}`;
        try {
            const response = await fetch(deleteCommentApi, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('error in delete comment');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    // handel add react to a post
    const addReact = async (post) => {
        const token = localStorage.getItem('token');
        const addReactApi = `${apiUrl}/api/posts/react/${post.id}`;

        if (isReacting[post.id]) return;

        setIsReacting(prev => ({ ...prev, [post.id]: true }));

        try {
            const response = await fetch(addReactApi, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setReacts(prevReacts => ({
                    ...prevReacts,
                    [post.id]: !reacts[post.id] // Toggle react state
                }));
                setReactsCount(prevReactsCount => ({
                    ...prevReactsCount,
                    [post.id]: reacts[post.id] ? reactsCount[post.id] - 1 : reactsCount[post.id] + 1 // Update react count
                }));
            } else {
                console.error('error in add react');
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsReacting(prev => ({ ...prev, [post.id]: false }));
        }
    };

    // handel going to user profile
    const viewPuplisherProfile = (userId) => {
        navigate(`/profile/${userId}`);
    }

    // handel react putton color by user react
    useEffect(() => {
        posts.forEach(post => {
            const userReacted = post.reacts.find(react => react.email === userRef?.email);
            setReacts(prevReacts => ({
                ...prevReacts,
                [post.id]: !!userReacted
            }));
            setReactsCount(prevReacts => ({
                ...prevReacts,
                [post.id]: post.reacts.length
            }));
        });
    }, [posts, userRef]);

    return (
        <>
            {loading ? (<h1>Loading...</h1>) : (
                error ? (<Notfound />) :
                    <section className={isSidebarActive ? (isLoggedIn ? `bage-body active` : `bage active`) : (isLoggedIn ? `bage-body` : `bage`)}>
                        <form className='profile-form'>
                            <div className='flex-container left'>
                                <div className='profile-container'>
                                    <div className="main-box">
                                        <img className='image' alt={otherUserRef ? `${otherUserRef.firstname} ${otherUserRef.lastname}'s profile` : 'profile'} src={otherUserRef ? otherUserRef.profile : profileImg} />
                                    </div>
                                </div>
                                <h2>{`${otherUserRef ? otherUserRef.firstname : ''} ${otherUserRef ? otherUserRef.lastname : ''}`}</h2>
                            </div>
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
                            <div className='view-likes'>
                                <div>
                                    <span>{reactsCount[post.id]}</span>
                                </div>
                                <div>
                                    <button className={ reacts[post.id] ? 'like-btn active' : 'like-btn'} onClick={ async () => await addReact(post)} disabled={isReacting[post.id]}><i className="fas fa-thumbs-up"></i></button>
                                </div>
                            </div>
                            <div className = 'create-comment'>
                                <textarea placeholder='comment. . .' name="comment" value={comment} onChange={(e) => setComment(e.target.value)} required maxLength='200' rows='2'/>
                                <button className = 'post-btn' onClick={() => createComment(post.id)}>Post</button>
                            </div>
                            <div className = 'comments-box'>
                                {post.comments.map((comment) => (
                                    <div key={comment.id} className='comment-box'>
                                        <div className='div'>
                                            <button className='user-box' onClick={() => viewPuplisherProfile(comment.owner.id)}>
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
            )}
        </>
    );
};

export default UserProfile;
