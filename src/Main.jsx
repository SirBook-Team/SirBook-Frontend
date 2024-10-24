import React, { useState } from 'react';
import { useEffect } from 'react';


const Main = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [api, setApi] = useState('https://jsonplaceholder.typicode.com/posts');

    useEffect(() => {
        fetch(api)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [api]);

    console.log(posts);


  return (
    <>
        <section className='bage-body'>
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
