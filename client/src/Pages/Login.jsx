import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

const Login = () => {
  let [userData,setUserData] = useState({
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

  const {login} = useContext(AuthContext);

  async function handelSubmit (e){
    e.preventDefault();
    try{
      axios.defaults.withCredentials = true;
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
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <input required placeholder='email address' type="text" id="fname" name="email" onChange={handelChange}/>
        <input required placeholder='password' type="text" id="lname" name="password" onChange={handelChange}/>
        <button>Login</button>
        {errorText && <p className='error'>{errorText}</p>}
        <span>Don't have an account? <Link to={"/register"}>Register</Link>
        </span> 
        
        </form>
    </div>
  );
}

export default Login