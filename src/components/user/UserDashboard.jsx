import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from '../hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import useFetchCat2 from '../hooks/useFetchCat2';
import Tables from '../Tables';
import Matches from '../Matches';
import UserMatches from './UserMatches';
import Mybets from './Mybets';
import useFetchUser from '../hooks/useFetchUser';
function UserDashboard() {

  const [name, setcat] = useState('matches')
  useAuth()
  const { userInfo} = useFetchUser()
 console.log(userInfo[0]?.balance)
  return (
    <div className="main-container">
    <div className="header">
  
        <div className="form-select">
            <label htmlFor=""><small>Filter By</small> </label>
    <select name="" id="" onChange={(e)=>{setcat(e.target.value)}}>
      
      <option value="matches">Matches</option>
      <option value="bets">My Bets</option>
           </select>
        </div>
        <div className="account">
          <Link to='/deposit'>
            <AiOutlinePlusSquare style={{ color: "green", fontSize: "1.2rem" }} />
          </Link>
                   
          <small>KES {userInfo[0]?.balance} </small>
       
          <Link to='/withdraw'>
            <AiOutlineMinusSquare style={{ color: "blue", fontSize: "1.2rem" }} />
          </Link>
        </div>

      </div>
    {name=='matches' ? (  <UserMatches/> ) : (<Mybets />)}
      </div>

 )
}

export default UserDashboard