import API from "../axios_common";
import React, { useState } from 'react';
 import ReactQuill from 'react-quill';
 import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MuiButton } from '../Components/MuiComponents';
 const write = () => {
  const state = useLocation().state;
  const location = useLocation();
  
  
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))


  let [photoFile,setPhotoFile] = useState(null)
  let [postData,setPostData] = useState({
      title:state?.title || "",
      body:state?.body || "",
      photo:state?.photo || "",
      postingdate:state?.postingdate || formattedDate,
      userid:user.id,
      genre:state?.genre || "Art"
  });

  async function handlePuplishing (e) {
    e.preventDefault();
    let photoURL = null;
    try{
      if (photoFile !== null) {
        photoURL = await upload();
        
        setPostData((prevVal) => {
          return {...prevVal, }
        });}
      API.defaults.withCredentials = true;
      
      if (state !== null){
        let postId = location.search.split("=")[1]
        
        let res = await API.put(`/posts/${postId}`,photoURL?{...postData, photo:photoURL}:postData)
        if(res.status===200){ 
          navigate("/");
        }
      }else{
        let res = await API.post("/posts/",photoURL?{...postData, photo:photoURL}:postData)
        if(res.status===200){ 
          navigate("/");
        }
      }


    }catch(err){
       console.log(err); 
    }
  }

  function handleQuillChange(value) {
    setPostData((prevVal) => {
      return { ...prevVal, body: value };
    });
  }

  function handleChange (e) {
    let [value,name] = [e.target.value,e.target.name]
    setPostData((prevVal) => {
      return {...prevVal, [name]:value}
    });
  }


  async function upload () {
    try {
      const formData = new FormData();
      formData.append("photo",photoFile);
      const res = await API.post("/upload",formData)
      return res.data ;
      
    } catch (error) {
      console.log(error);
      
    }
  }
   return (
    <div className='writePage-container'>
    <div className='mainContent-write'>
      <input className='title-box' type="text" placeholder='Title' name='title' value={postData.title} onChange={handleChange}/>
      <div> <ReactQuill className='ReactQuill' theme="snow" value={postData.body}  onChange={handleQuillChange} /> </div>
    </div>
      <div className='side'>
      <div className='statusAndButtons'>
      <h2>Publish</h2>
      <span><b>Status:</b> {state?"Published":"Draft"} <br /> </span>
      <span><b>visability:</b> Public </span>
        <input style={{display:"none"}} type="file" id='file' name='photo' onChange={(e) => {setPhotoFile(e.target.files[0])}}/>
        <label className='file' htmlFor="file">upload image</label>
        <div className='publish'  onClick={handlePuplishing}>
          <MuiButton text={state ? "update":"publish"} bg = 'black' />
        </div>
      </div>
    
      <div className="radio-group">
        <h2>Category:</h2>
      <label>
        <input onClick={handleChange} type="radio" name="genre" value="Art" defaultChecked
        checked={postData.genre === 'Art'}
        />
        <div className="custom-radio"></div>
        <span>Art</span>
      </label>
      <label>
        <input onClick={handleChange} type="radio" name="genre" value="Science" 
        checked={postData.genre === 'Science'}
        />
        <div className="custom-radio"></div>
        <span>Science</span>
      </label>
      <label>
        <input onClick={handleChange} type="radio" name="genre" value="Design" 
        checked={postData.genre === 'Design'}
        />
        <div className="custom-radio"></div>
        <span>Design</span>
      </label>
      <label>
        <input onClick={handleChange} type="radio" name="genre" value="Food" 
        checked={postData.genre === 'Food'}
        />
        <div className="custom-radio"></div>
        <span>Food</span>
      </label>
      <label>
        <input onClick={handleChange} type="radio" name="genre" value="Sport" 
        checked={postData.genre === 'Sport'}
        />
        <div className="custom-radio"></div>
        <span>Sport</span>
      </label>
    </div>

      </div>
    </div>
   )
 }
 
 export default write