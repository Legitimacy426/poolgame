import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "../firebase.config"
import Swal from 'sweetalert2'
import useFetchPlayers from "../hooks/useFetchPlayers"
import useAuth from "../hooks/useAuth"
import useFetchUser from "../hooks/useFetchUser"

const Deposit = () => {
    const { userId } = useAuth()
    
   
    const [phone,setPhone] = useState()  
    const [rand,setRand] = useState(100)
    const [amount, setAmount] = useState(0)
    const { userInfo } = useFetchUser(rand)
    

    

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
           e.preventDefault()
            setRand(Math.random())
        
     
        if (userInfo.length > 0) {
            const { id, balance,userId } = userInfo[0]
            const deposit = {
                userId: userId,
                accountId: id,
                amount: amount,
                phone: phone,
                createdAt:serverTimestamp()
            }
            const depoRef = collection(db, "deposits")
            addDoc(depoRef, deposit).then(() => {
                // success
                // update balance
                const newAmt = parseInt(balance)+parseInt(amount)
                const accRef = doc(db, "accounts", id)
                updateDoc(accRef, {
                    balance: newAmt,
                    phone:phone
                }).then(() => {
                    // success everything.....
                 
                    Swal.fire(
                        'success',
                        `Your current balance is ${newAmt}`,
                        'success'
                      )

                })
                .catch((e) => {
                    //error inserting depo
                    Swal.fire(
                        'error',
                        `${e.message}`,
                        'error'
                      )
                })
            }).catch((e) => {
                //error inserting depo
                Swal.fire(
                    'error',
                    `${e.message}`,
                    'error'
                  )
            })
        } else {
            // error could not get current balance

     }
        
   }
    return (
        <div className="main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                    <h3>Deposit to 8Balls</h3> 
       
        <div className="form-group">
                        <label htmlFor="">Enter Amount</label>
                    <input min={1} required type="number" placeholder="Enter amount" name="amount" onChange={(e)=>{setAmount(e.target.value)}} />      
                    </div>
        <div className="form-group">
                        <label htmlFor="">Enter Phone</label>
                    <input  required placeholder="eg 254746121315" type="number" name="phone" onChange={(e)=>{setPhone(e.target.value)}} />      
                    </div>
                   

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Deposit