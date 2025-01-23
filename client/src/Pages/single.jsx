import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SideMenu from './sideMenu'
import API from "../axios_common";
import moment from 'moment'
import { AuthContext } from '../context/authContext.jsx'


const single = () => {
  let [found,setFound] = useState ("ok");
  const [post ,setPost] = useState({
    name:"",
    uPhoto:"",
    body:"",
    title:"",
    photo:"",
    postingdate:"",
    genre:"",
  })
  
  const location = useLocation();
  const navigator = useNavigate();
  let postId = location.pathname.split("/")[2]
  const {currentUser} = useContext(AuthContext)
  async function getPost (){
    try{
      const res = await API.get(`/posts/${postId}`);
      
      return ( res.data[0]) ;
    }catch(err){
      console.log("error : ",err);
      setFound ("404");
      return [];
    }
  }
  
  async function handleDelete(){
    try{
    const res = await API.delete(`/posts/${postId}`, {
      withCredentials: true, // Ensure cookies are included
    });
    if(res.status===200){ 
      navigator("/");
    }
  }catch(err){
    console.log(err);
  }
  }

  useEffect (() => {
    const fetchPosts = async () => {
      const postData = await getPost();
      setPost(postData);
    };

    fetchPosts();
  }, [postId]);  
  return (
    found !== "404" ? (
    <div className='post-container'>
      <div className='post-content'>
        {post.photo &&<img className='main-img' src= {post?.photo} alt="" />}
        <div className='avatar-panel'>
          {post.uPhoto && <img className='avatar' src="/avatar.png" alt="" />}
          <div>
            <h3>{post.name}</h3>
            <p>posted on {post.postingdate}</p>
            </div>
          
          {currentUser!== null && currentUser.name === post.name && (
          <div className='postEditDel'>
          <Link state={post} to = {`/write?edit=${postId}`} ><img className="edit" src="/edit.png" alt="" /></Link>
          <Link onClick={handleDelete}><img className='delete' src="/delete.png" alt="" /></Link>
          </div>
          )}
          </div>
        <div className='main-text'>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
         
        </div>
      </div>
      <div className='side-menu'>
      <SideMenu genre={post.genre} />
      </div>
    </div>

        ) : (
        <h2>404 - Page Not Found</h2>
)
  )
}

export default single