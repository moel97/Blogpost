import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import LOGO from '../../public/logo.png';
import { AuthContext } from '../context/authContext.jsx';
import { IoMenuSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import {MuiButton} from "./MuiComponents.jsx"
import Logo from './SmallerComponents.jsx';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const  ListIcon = () => { 
   return(
       <IconContext.Provider value={{ size: "2em" }}>
       <IoMenuSharp />
       </IconContext.Provider>);
  } 

  const  CloseIcon = () => { 
   return(
       <IconContext.Provider value={{ size: "2em" }}>
       <MdClose />
       </IconContext.Provider>);
  } 
  const {currentUser,logout} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className='container'>
        
        <Logo/>
        
        <div className='links'> 
          <Link className='link'  to={"/"}>Home</Link>
          <Link className='link'  to={"/?cat=art"}>Art</Link>
          <Link className='link'  to={"/?cat=science"}>Science</Link>
          <Link className='link'  to={"/?cat=design"}>Design</Link>
          <Link className='link'  to={"/?cat=food"}>Food</Link>
          <Link className='link'  to={"/?cat=sport"}>Sport</Link>
          </div>
          <div className='links'>
          <span >{currentUser&&currentUser.name}</span>
          {currentUser?<span onClick={logout} ><MuiButton text='Logout' bg = 'black'/></span>: <span> <Link className='link'  to={"/login"}><MuiButton text='Login' bg = 'white'/></Link> </span>}
          <span>
            {currentUser? <Link className='link'  to={"/write"}> <MuiButton text='Write' bg = 'black' /> </Link> : <Link className='link'  to={"/login"}><MuiButton text='Write' bg = 'black' /></Link> }
        </span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className='list'> {isOpen?<CloseIcon/>:<ListIcon/>} </button>

        
          {isOpen && (
            <div className="droplist"> 
            <div className='links'> 
            <Link className='link'  to={"/"}>Home</Link>
            <Link className='link'  to={"/?cat=art"}>Art</Link>
            <Link className='link'  to={"/?cat=science"}>Science</Link>
            <Link className='link'  to={"/?cat=design"}>Design</Link>
            <Link className='link'  to={"/?cat=food"}>Food</Link>
            <Link className='link'  to={"/?cat=sport"}>Sport</Link>
            </div>
            <div className='links'>
            <span >{currentUser&&currentUser.name}</span>
            {currentUser?<span onClick={logout} ><MuiButton text='Logout' bg = 'black'/></span>: <span> <Link className='link'  to={"/login"}><MuiButton text='Login' bg = 'white'/></Link> </span>}
            <span>
              {currentUser? <Link className='link'  to={"/write"}> <MuiButton text='Write' bg = 'black' /> </Link> : <Link className='link'  to={"/login"}><MuiButton text='Write' bg = 'black' /></Link> }
          </span>
          </div>
          </div>
          )}
        
        
      
      </div>
    </div>
  )
}

export default Navbar