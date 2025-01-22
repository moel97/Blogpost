import React, { useContext, useState } from 'react'
import API from "../axios_common";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import { FaEye,FaEyeSlash } from "react-icons/fa";

const Login = () => {
  let [userData,setUserData] = useState({
    email:"",
    password:""
  });

  let [visable,setVisable] = useState(false); 

  let [errorText,setErrorText]= useState(null);
  
  let navigate = useNavigate();

  function handelChange (e) {
    let [value,name] = [e.target.value,e.target.name]
    setUserData((prevValue) =>{
       return {...prevValue, [name]: value}
      });
  }

  const {login} = useContext(AuthContext);

  async function handelSubmit (e){
    e.preventDefault();
    try{
      API.defaults.withCredentials = true;
      let res = await login(userData)
      if(res.status===200){
        setErrorText (null); 
        navigate("/");
      }

    }catch(err){
      setErrorText (err.response.data); 
    }

  }

  return (
    <div className='app'>
    <Navbar/>
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <input required placeholder='email address' type="text" name="email" onChange={handelChange}/>
        <div className='password'>
        <input required placeholder='password' type={visable?"text":"password"} name="password" 
        onChange={handelChange}>
        </input>
          <div className='eye' onClick={()=>{setVisable(!visable)}}>
          {visable? <FaEyeSlash />:<FaEye />}
          </div>
        </div>
        <button>Login</button>
        {errorText && <p className='error'>{errorText}</p>}
        <span>Don't have an account? <Link to={"/register"}>Register</Link>
        </span> 
        
        </form>
    </div>
    <Footer/>
    </div>
  );
}

export default Login