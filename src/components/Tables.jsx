import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from './hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from './hooks/useFetchCat2';
function Tables() {
  const [cat, setcat] = useState('all')
  const [time,setTime] = useState('')
  useAuth()
  const { cards } = useFetchCat(cat, time)
  const {cats} = useFetchCat2()
  console.log(cards)
  return (
      <div className="main-container">
          <div className="header">
        
        <div className="form-select">
                  <label htmlFor="">Tables </label>
          <select name="" id="" onChange={(e)=>{setcat(e.target.value)}}>
            <option value="all">All</option>
            {cats.map(card => (
              <option value={card.name }>{card.name }</option>
                    ))}
                 </select>
              </div>
              <div className="button"><Link to='/table'>New Table</Link></div>

      </div>
    
      <div className="cards-main">
        {cards.map((card) => (
          <div className="caard">
          <BiAperture />
            <div className="top">
              <h4>{card.name }</h4>
         
              <p>{ card.status}</p>
            </div>
           <small> {card.comment }</small>
            <div className="bottom">
            {/* <Link to={`/add/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiPlus /></Link> */}
            {/* <Link to={`/minus/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiMinus /></Link> */}
              <Link to={`/edit/${card.name}/${card.id}/${card.quantity}`} className="icon"><AiFillEdit /></Link>
              <small>{ new Date().toDateString(card.createdAt) }</small>
            </div>
           
          </div>
     ))}
     
  
      </div>
    </div>
  )
}

export default Tables