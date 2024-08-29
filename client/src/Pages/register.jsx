import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const register = () => {
  let [userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  });
  let [errorText,setErrorText]= useState(null);
  
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
      <div className='register'>
        <h1>Register</h1>
        <form  onSubmit={handelSubmit}>
          <input  placeholder='user name' name='name' type="text" onChange={handelChange}  required/>
          <input  placeholder='email address' type="text" onChange={handelChange} name='email' required/>
          <input  placeholder='password' type="text" onChange={handelChange} name='password' required/>
          <button >register</button>
          {errorText && <p className='error'>{errorText}</p>}
          <span>already have an account? <Link to={"/login"}>Login</Link>
          </span> 
          
          </form>
      </div>
  )
}

export default register