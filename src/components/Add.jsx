import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'

const Add = () => {
   
    const { cat,id,q } = useParams()
    
    const [name,setName] = useState('')
    const [odds,setOdds] = useState(``)
   
    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
        const docRef = collection(db, 'players')
       
        addDoc(docRef, {
            odds: odds,
            createdAt: serverTimestamp(),
            name: name,
            mid: id,
            winner:'false'
        }).then(() => {
            // success
            // alert(`Added ${quantity} ${cat}`)
            Swal.fire(
                'Success',
                `Added ${name} on ${cat}`,
                'success'
              )
        }).catch(e => {
          
            Swal.fire(
                'error',
                `${e.message}`,
                'error'
              )
        })

        
   }
    return (
        <div className="main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                    <h3>Add Player on { cat}</h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id=""
                            value={name}
                            onChange = {(e)=>{setName(e.target.value)}}
                        />         
           </div>
        <div className="form-group">
                        <label htmlFor="">Odds</label>
                        <input
                            
                            type="number"
                            name="odds"
                            id=""
                            value={odds}
                            onChange = {(e)=>{setOdds(e.target.value)}}
                        />         
           </div>

                   
                    <button className="submit">Add</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Add