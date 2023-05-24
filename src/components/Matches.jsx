import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from './hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from './hooks/useFetchCat2';
import useFetchMatchNames from './hooks/useFetchMatchNames';
import useFetchMatches from './hooks/useFetchMatches';
import useFetchMatchesAd from './hooks/useFetchMatchesAd';
function Matches() {
  const [name, setcat] = useState('all')

  useAuth()
  const { cards : matches } = useFetchMatchesAd(name)
  const {cats} = useFetchMatchNames()
  
  return (
      <div className="main-container">
          <div className="header">
        
              <div className="form-select">
                  <label htmlFor="">Filter by </label>
          <select name="" id="" onChange={(e)=>{setcat(e.target.value)}}>
            <option value="all">All</option>
            {cats.map(card => (
              <option value={card.name }>{card.name }</option>
                    ))}
                 </select>
              </div>
              <div className="button"><Link to='/match'>New Match</Link></div>

      </div>
      
      <div className="cards-main">
      {matches.length == 0 ? <center> Matches will appers here</center> : ""}
        {matches.map((card) => (
          <div className="caard">
          <BiAperture />
            <div className="top">
              <h4>{card.name }</h4>
         
              <p>{ card.status}</p>
            </div>
           <small> {card.comment }</small>
            <div className="bottom">
            <Link to={`/add/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiPlus /></Link>
            <Link to={`/minus/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiMinus /></Link>
            <Link to={`/editmatch/${card.name}/${card.id}/${card.quantity}`} className="icon"><AiFillEdit /></Link>
            </div>
           
          </div>
     ))}
     
  
      </div>
    </div>
  )
}

export default Matches