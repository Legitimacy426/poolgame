import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from '../hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from '../hooks/useFetchCat2';
import useFetchMatchNames from '../hooks/useFetchMatchNames';
import useFetchMatches from '../hooks/useFetchMatches';
function UserMatches() {
  const [name, setcat] = useState('all')

  useAuth()
  const { cards : matches } = useFetchMatches(name)
  const {cats} = useFetchMatchNames()
  console.log(matches)
  return (
      <div className="main-container">
          {matches.length == 0 ? <center>Available matches will appers here</center> : ""}
      
      <div className="cards-main">
        {matches.map((card) => (
          <div className="caard">
          <BiAperture />
            <div className="top">
              <h4>{card.name }</h4>
         
              <p>{ card.status}</p>
            </div>
           {/* <small> {card }</small> */}
            <div className="bottom">
              <div></div>
            {/* <Link to={`/add/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiPlus /></Link>
            <Link to={`/minus/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiMinus /></Link> */}
              <Link  className='link' to={`/bet/${card.name}/${card.id}/${card.quantity}`}>Bet<AiOutlineArrowRight /></Link>
           
            </div>
           
          </div>
     ))}
     
  
      </div>
    </div>
  )
}

export default UserMatches