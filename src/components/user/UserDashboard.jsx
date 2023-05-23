import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from '../hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from '../hooks/useFetchCat2';
import Tables from '../Tables';
import Matches from '../Matches';
import UserMatches from './UserMatches';
import Mybets from './Mybets';
function UserDashboard() {

  const [name, setcat] = useState('matches')
useAuth()
 
  return (
    <div className="main-container">
    <div className="header">
  
        <div className="form-select">
            <label htmlFor="">Filter By </label>
    <select name="" id="" onChange={(e)=>{setcat(e.target.value)}}>
      
      <option value="pending">Matches</option>
      <option value="completed">My Bets</option>
           </select>
        </div>
        <div className="button"><Link to='/account'>Account</Link></div>
        {/* <div className="button"><Link to='/logout'>Logout</Link></div> */}

      </div>
    {name=='matches' ? (  <UserMatches/> ) : (<Mybets />)}
      </div>

 )
}

export default UserDashboard