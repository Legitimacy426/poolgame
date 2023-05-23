import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import { Link } from 'react-router-dom'
import useFetchCat from './hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from './hooks/useFetchCat2';
import Tables from './Tables';
import Matches from './Matches';
function Dashboard() {
  const [action, setAction] = useState('tables')
  const [time,setTime] = useState('')
  useAuth()

 
  return (
    // header
     <>
        <div className="main-container">
           
       <div className="header">
        
        <div className="form-select">
                  <label htmlFor="">Actions </label>
          <select name="" id="" onChange={(e)=>{setAction(e.target.value)}}>
            <option value="tables">Tables</option>
            <option value="matches">Matches</option>
            
                 </select>
              </div>
             

      </div>
        </div>
   {action == 'tables' ? (<Tables />) : <Matches />}
    </>

  
 )
}

export default Dashboard