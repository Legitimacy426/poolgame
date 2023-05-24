import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetchCat from '../hooks/useFetchcat'
import { BiAperture, BiArrowToRight, BiMinus, BiPlus } from "react-icons/bi";
import { AiFillEdit, AiOutlineArrowRight } from "react-icons/ai";
import useFetchCat2 from '../hooks/useFetchCat2';
import useFetchMatchNames from '../hooks/useFetchMatchNames';

import useFetchMyBets from '../hooks/useFetchMyBets';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import useFetchMatch from '../hooks/useFetchMatch';
import useFetchBet from '../hooks/useFetchBet'
import useFetchUser from '../hooks/useFetchUser';
function Details() {
  const [name, setcat] = useState('all')
  const navigate = useNavigate()
    const { userId} = useAuth() 
    const { id, mid } = useParams()
   const { cards: bets } = useFetchMyBets(userId)
    const { matchInfo } = useFetchMatch(mid)
    const { betInfo } = useFetchBet(id)
    const {userInfo} = useFetchUser()
    console.log('usrer',userInfo)
    console.log('match',matchInfo)
    console.log('bet', betInfo)
    
    const handleSubmit = (betid, earning) => {
        // update bet to claimed
        if (userInfo.length > 0) {
            const betRef = doc(db, 'bets', betid)
        updateDoc(betRef, {
            status: "Redeemed",
            altimate :"Won"
        }).then(() => {
            // update balance
            const accRef = doc(db, 'accounts', userInfo[0].id)
            const newAmt = parseInt(userInfo[0].balance) + parseInt(earning)
            updateDoc(accRef, {
                balance : newAmt 
            }).then(() => {
                // sucees all--------------------------------
                navigate(-1)
            }).catch(e => {
                Swal.fire(
                    'Oops',
                    `${e.message} `,
                    'error'
                  )
            })
        }).catch((e) => {
            Swal.fire(
                'Oops',
                `${e.message} `,
                'error'
              )
        })
        } else {
            Swal.fire(
                'Oops',
                `Something went wrong,retry`,
                'error'
              )  
     }
    }
    // loosing got it
    const handleLoose = (betid) => {
        // update bet to claimed
        if (userInfo.length > 0) {
            const betRef = doc(db, 'bets', betid)
        updateDoc(betRef, {
            status: "Redeemed",
            altimate :"Lost"
        }).then(() => {
            navigate(-1)
            
        }).catch((e) => {
            Swal.fire(
                'Oops',
                `${e.message} `,
                'error'
              )
        })
        } else {
            Swal.fire(
                'Oops',
                `Something went wrong,retry`,
                'error'
              )  
     }
    }
  return (
      <div className="main-container">
        <div className="caard">
          <BiAperture />
            <div className="top">
              <h4>{matchInfo[0]?.name }</h4>
         
                  <div className="win">
                      
                      <small>
                          {matchInfo[0]?.winner == betInfo[0]?.winnerId ?
                          <p style={{color:'green'}}>Won</p> :  <p style={{color:'red'}}>Lost({matchInfo[0]?.winner} Won)</p>}
                      </small>       
             </div>
            </div>
           <small>Possible win KES {betInfo[0]?.winAmount}</small>
              <div className="bottom">
                  <div></div>
            {/* <Link to={`/add/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiPlus /></Link>
            <Link to={`/minus/${card.name}/${card.id}/${card.quantity}`} className="icon"><BiMinus /></Link> */}
                   {matchInfo[0]?.winner == betInfo[0]?.winnerId ?
                      <Link className='link' onClick={()=>{handleSubmit(betInfo[0]?.id,betInfo[0]?.winAmount)}}>
                          Redeem KES {betInfo[0]?.winAmount}
                          <AiOutlineArrowRight /> </Link> :
                       <Link className='link' onClick={()=>{handleLoose(betInfo[0]?.id)}}>
                      Got it
                       <AiOutlineArrowRight /> </Link>
                     }

            </div>
           
          </div>
      </div>
  )
}

export default Details