import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from '../hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from '../hooks/useFetchCat2';
import useFetchMatchNames from '../hooks/useFetchMatchNames';

import useFetchMyBets from '../hooks/useFetchMyBets';
function Mybets() {
  const [name, setcat] = useState('all')

    const { userId} = useAuth()
  const { cards : bets } = useFetchMyBets(userId)

  
  return (
      <div className="main-container">
       
      
      <div className="cards-main">
        {bets.map((card) => (
          <div className="caard">
          <BiAperture />
            <div className="top">
              <h4>{card.match }</h4>
         
              <small>{ card.status}</small>
            </div>
           <small>possible win  KES {card.winAmount }</small>
            <div className="bottom">
            {/* <Link to={`/add/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiPlus /></Link>
            <Link to={`/minus/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiMinus /></Link> */}
            <Link to={`/bet/${card.name}/${card.id}/${card.quantity}`} className="icon"><AiFillEdit /></Link>
            </div>
           
          </div>
     ))}
     
  
      </div>
    </div>
  )
}

export default Mybets