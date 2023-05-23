import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "../firebase.config"
import Swal from 'sweetalert2'
import useFetchPlayers from "../hooks/useFetchPlayers"
import useAuth from "../hooks/useAuth"

const Bet = () => {
    const { userId } = useAuth()
    
    const { cat,id,q } = useParams()
    const [win,setWin] = useState()  
    const [winner,setWinner] = useState('')
    const [amount, setAmount] = useState(0)
    const odd = winner.split(',')[1]
    const winnerid = winner.split(',')[0]
   
     const possiblewin = (parseInt(amount)*odd)+parseInt(amount)
    const { cards: players } = useFetchPlayers(id)
   
    

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
      
        e.preventDefault()
        const docRef = collection(db, 'bets')
        const bet = {
            userId: userId,
            matchId: id,
            createdAt: serverTimestamp(),
            winnerId: winnerid,
            winAmount: possiblewin,
            status: "pending",
            odds: odd,
            match: cat,
            amount:amount
            
        }
        addDoc(docRef, bet).then(() => {
            Swal.fire(
                'success',
                ` Bet placed succesifully`,
                'success'
              )
        }).catch(e => {
            Swal.fire(
                'Oops',
                `${e.message} `,
                'error'
              )
       })
    
   }
    return (
        <div className="main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                    <h3>Place a bet in { cat}</h3> 
        <div className="form-group">
                        <label htmlFor="">Select the Winner</label>
                        <select required name="winner" onChange={(e) => { setWinner(e.target.value) }} id="">
                            <option value="">Select the winner</option>
                            {players.map(player => (
                            <option value={[player.id,player.odds]}>{player.name} ({ player.odds})</option>
                        ))}
                        </select>       
           </div>
        <div className="form-group">
                        <label htmlFor="">Enter Amount</label>
                    <input type="number" name="amount" onChange={(e)=>{setAmount(e.target.value)}} />      
                    </div>
                    <br />
                    {amount == 0 ? "":(<p style={{ color: "green" }}>Possible win { possiblewin}</p>)}

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Bet