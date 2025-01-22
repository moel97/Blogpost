
import React from 'react'
import { Link } from 'react-router-dom'
import {MuiButton} from "../Components/MuiComponents"
function postCard(probs) {
  return (
    <div  className="card">
      <div className="top">
         {probs.img? <img src={probs.img} alt="img" />: null}
      </div>
      <div className="bottom">
        <Link to={`/Post/${probs.id}`}>
         <h4 className='title'>{probs.title}</h4>
         </Link>
         <div className='desc' dangerouslySetInnerHTML={{ __html: probs.desc }} />
         <div className="cardButtons">
         <Link to={`/Post/${probs.id}`}><MuiButton text = 'Read More' bg="black" /></Link>
         <h2 className="genere-gradient"> {probs.genre} </h2>

         </div>
      </div>
    </div>
  )
}

export default postCard