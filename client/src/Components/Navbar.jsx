import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import LOGO from '../../public/logo.png';
import { AuthContext } from '../context/authContext.jsx';
function Navbar() {
  const {currentUser,logout} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className='container'>
        
        <div className='logo'> 
        <Link className='link'  to={"/"}><img src={LOGO} alt="logo" /></Link>
        </div>
        <div className='links'> 
          <Link className='link'  to={"/"}>Home</Link>
          <Link className='link'  to={"/?cat=art"}>Art</Link>
          <Link className='link'  to={"/?cat=science"}>Science</Link>
          <Link className='link'  to={"/?cat=design"}>Design</Link>
          <Link className='link'  to={"/?cat=food"}>Food</Link>
          <Link className='link'  to={"/?cat=sport"}>Sport</Link>
          <span >{currentUser&&currentUser.name}</span>
          {currentUser?<span onClick={logout} >logout</span>:<Link className='link'  to={"/login"}>Login</Link>}
          <span className='write'>
            {currentUser? <Link className='link'  to={"/write"}>Write</Link> : <Link className='link'  to={"/login"}>Write</Link> }
          </span>
        </div>
        
      
      </div>
    </div>
  )
}

export default Navbar