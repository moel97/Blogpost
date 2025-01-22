import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import API from "../axios_common";
function sideMenu(props) {

  const genre = props.genre ; 
  const location = useLocation();
  let postId = location.pathname.split("/")[2]
  const [posts ,setPosts] = useState([])
  
  async function getPosts (){
    try{
      
      const res = await API.get(`/posts/?cat=${props.genre}`);
      return ( res.data) ;
    }catch(err){
      console.log(err);
      return [];
    }
  }
  
  useEffect (() => {
    if (genre){
    const fetchPosts = async () => {
      const postsData = await getPosts();
      setPosts(postsData);
    };

    fetchPosts();}
  }, [genre]);

  return (
    <div className='sideMenuContainer'>
        {posts.length>1&&<h1>Posts you may like</h1>}
        {posts.map((post)=>{
          
          if (+postId !== post.id){
            return(
            <div key={post.id}>
                <img src={post?.photo} alt="" />
                <Link className='link' to = {`/Post/${post.id}`}>
                <h3>{post.title}</h3>
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