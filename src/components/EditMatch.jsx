import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'
import useFetchPlayers from "./hooks/useFetchPlayers"

const EditMatch = () => {
   
    const { cat,id,q } = useParams()
      
    const [winner,setWinner] = useState('')
    const [name,setName] = useState(cat)
    const [status,setStatus] = useState('Active')
     const {cards : players} = useFetchPlayers(id)

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        alert(winner)
        e.preventDefault()
        const docRef = doc(db, 'matches', id)
        updateDoc(docRef, {
            winner: winner,
            status:"completed"
        }).then(() => {
            Swal.fire(
                'success',
                ` Winner Added`,
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
                    <h3>Edit { cat}</h3> 
                    
        {/* <div className="form-group">
                        <label htmlFor="">Match Name</label>
                        <input
                            required
                           placeholder={cat}
                            type="text"
                            name="quantity"
                            id=""
                            value={name}
                            onChange = {(e)=>{setName(e.target.value)}}
                        />         
           </div> */}
     
        {/* <div className="form-group">
                        <label htmlFor="">status</label>
                        <select name="status" onChange={(e)=>{setStatus(e.target.value)}} id="">
                            <option value="on">On</option>
                            <option value="off">Off</option>
                            <option value="Deactivate">Deactivate</option>
                        </select>       
           </div> */}
        <div className="form-group">
                        <label htmlFor="">Select the Winner</label>
                        <select required name="winner" onChange={(e) => { setWinner(e.target.value) }} id="">
                            <option value="">Select the winner</option>
                            {players.map(player => (
                                <option value={player.id}>{ player.name}</option>
                        ))}
                        </select>       
           </div>

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default EditMatch