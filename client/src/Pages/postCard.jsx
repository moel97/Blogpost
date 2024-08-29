
import React from 'react'
import { Link } from 'react-router-dom'
function postCard(probs) {
  return (
    <div className="card">
      <div className="top">
         <img src={probs.img} alt="img" />
      </div>
      <div className="bottom">
        <Link to={`/Post/${probs.id}`}>
         <h4 className='title'>{probs.title}</h4>
         </Link>
         <p className='desc' >{probs.desc}</p>
         <Link to={`/Post/${probs.id}`}><button >Read More</button></Link>
      </div>
    </div>
  )
}

export default postCard