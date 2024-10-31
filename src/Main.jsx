import React, { useState, useContext } from 'react';
import { useEffect } from 'react';

import { LoginContext } from './LoginContext';



const Main = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [postsApi, setPostsApi] = useState('https://ideal-computing-machine-wqqvr4qg96ghvgp7-4000.app.github.dev/api/posts');
    const [postsApi, setPostsApi] = useState('https://jsonplaceholder.typicode.com/posts');
    const [isLoggedIn, setIsLoggedIn]= useContext(LoginContext);


    // useEffect(() => {
    //     fetch(api)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch posts');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setPosts(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error.message);
    //             setLoading(false);
    //         });
    // }, [api]);

    // console.log(posts);
    // useEffect(() => {
    //     const checkToken = async () => {
    //         if (isLoggedIn) {
    //             const token = localStorage.getItem('token');
    //             try {
    //                 const response = await fetch(checkTokenApi, {
    //                     method: 'GET',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`, // send token as part of headers
    //                     },
    //                     // body: JSON.stringify({ token }),
    //                 });

    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     console.log(data);
    //                     setUser(data);
    //                 } else {
    //                     setIsLoggedIn(false);
    //                     localStorage.removeItem('token');
    //                     navigate('/login');
    //                 }
    //             } catch (error) {
    //                 console.error('Error verifying token:', error);
    //                 setIsLoggedIn(false);
    //                 localStorage.removeItem('token');
    //                 navigate('/login');
    //             }
    //         }
    //     };
    //     checkToken();
    // }, [isLoggedIn, navigate, setIsLoggedIn, checkTokenApi]);
    useEffect(() => {
        const getPosts = async () => {
            if (isLoggedIn) {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(postsApi, {
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
                        setPosts(data);
                    } else {
                        console.error('response not ok:', error);
                    }
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        };
        getPosts();
    }, [isLoggedIn, postsApi, setPosts]);


  return (
    <>
        <section className={isLoggedIn ? 'bage-body' : 'bage'}>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    </>
  )
}

export default Main
