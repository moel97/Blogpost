import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
function sideMenu(props) {

  const genre = props.genre ; 
  const location = useLocation();
  let postId = location.pathname.split("/")[2]
  const [posts ,setPosts] = useState([])
  
  async function getPosts (){
    try{
      const res = await axios.get(`http://localhost:3000/api/posts/?cat=${genre}`);
      return ( res.data) ;
    }catch(err){
      console.log(err);
      return [];
    }
  }
  
  useEffect (() => {
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };

    fetchPosts();
  }, [genre]);

  return (
    <div className='sideMenuContainer'>
        <h1>Posts you may like</h1>
        {posts.map((post)=>{
          
          if (+postId !== post.id){
            return(
            <div key={post.id}>
                <img src={post?.photo} alt="" />
                <Link className='link' to = {`/Post/${post.id}`}>
                <h2>{post.title}</h2>
                </Link>

                

            </div>
            )}
        }
      )
        }
    </div>
  )
}

export default sideMenu