import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaEye,FaEyeSlash } from "react-icons/fa";
const register = () => {
  let [userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  });
  let [errorText,setErrorText]= useState(null);
  
  let [visable,setVisable] = useState(false);

  let navigate = useNavigate();

  function handelChange (e) {
    let [value,name] = [e.target.value,e.target.name]
    setUserData((prevValue) =>{
       return {...prevValue, [name]: value}
      });
  }

  async function handelSubmit (e){
    e.preventDefault();
    try{
      if (!userData.email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        setErrorText ("please enter a valid email");
        return;
      }
      let res = await axios.post("http://localhost:3000/api/auth/register", userData)
      if(res.status===200){
        setErrorText (null); 
        navigate("/login");
      }

    }catch(err){
      setErrorText (err.response.data); 
    }

  }

    return (
    <div className="app">
    <Navbar/>
      <div className='register'>
        <h1>Register</h1>
        <form  onSubmit={handelSubmit}>
          <input  placeholder='user name' name='name' type="text" onChange={handelChange}  required/>
          <input  placeholder='email address' type="text" onChange={handelChange} name='email' required/>
          <div className='password'>
              <input required placeholder='password' type={visable?"text":"password"} name="password" 
              onChange={handelChange}>
              </input>
                <div className='eye' onClick={()=>{setVisable(!visable)}}>
                {visable? <FaEyeSlash />:<FaEye />}
                </div>
          </div>
          <button >Register</button>
          {errorText && <p className='error'>{errorText}</p>}
          <span>already have an account? <Link to={"/login"}>Login</Link>
          </span> 
          
          </form>
      </div>
      <Footer/>
      </div>
  )
}

export default register