import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route, useParams, NavLink } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

const Home = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        console.log("Error fetching posts: ");
      }
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {posts ? posts.map((post, index) => (
          <NavLink style={{ display: "block" }} to={`/post/${post.id}`} key={index}>{post.id } - {post.title}</NavLink>)) : "No Posts"}
      </ul>
    </div>
  )
};

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
};

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  )
};

const Settings = () => {
  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  )
};

const SayUser = () => {
  const params = useParams();
  console.log("params: ", params);
  return (
    <div>
      <h1>My name is {params.userName}</h1>
    </div>
  )
};

const PostPage = () => {
  const params = useParams();
  const postId = params.postId;

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((data) => data.json())
      .then((data) => setPost(data));
  }, [])

  return (
    <div>
      <h1>post</h1>
      {post ? <> <p>{post.title}</p> <p>{post.body}</p></> : "No post"}
    </div>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/user/:userName' element={<SayUser />} />

        <Route path='account'>
          <Route path='profile' element={<Profile />} />
          <Route path='setting' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
