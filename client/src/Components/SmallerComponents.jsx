import React from 'react'
import { Link } from 'react-router-dom';
function Logo() {
  return (
    <div className='logo'> 
    <div className='custom-class'></div>
    <Link className='logoText'  to={"/"}> BlogSphere</Link>
    </div>
  )
}

export default Logo