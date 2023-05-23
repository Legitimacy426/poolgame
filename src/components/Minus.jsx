import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'

const Minus = () => {
   
    const { cat,id,q } = useParams()

    const [quantity,setQuantity] = useState()
    const [comment,setComment] = useState(`Removed ${cat}`)

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
        const docRef = doc(db, 'categories', id)
        const old = parseInt(q)
       
        const newnum = parseInt(quantity)
        if (old < newnum) {
           
            Swal.fire(
                'error',
                `You have ${q} ${cat}`,
                'error'
              )
            return
        }
        const sum = old-newnum
        updateDoc(docRef, {
            quantity: sum,
            createdAt: serverTimestamp(),
            comment:comment
        }).then(() => {
            // success
    
            Swal.fire(
                'Success',
                `Removed ${quantity} ${cat}`,
                'success'
              )
        }).catch(e => {
            alert()
            Swal.fire(
                'error',
                ` ${e.message}`,
                'error'
              )
        })

        
        
   }
    return (
        <div className="main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                    <h3>Remove { cat}</h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Quantity</label>
                        <input
                            required
                            type="number"
                            name="quantity"
                            id=""
                            value={quantity}
                            onChange = {(e)=>{setQuantity(e.target.value)}}
                        />         
           </div>
        <div className="form-group">
                        <label htmlFor="">Comment(Optional)</label>
                        <input
                            
                            type="text"
                            name="comment"
                            id=""
                            value={comment}
                            onChange = {(e)=>{setComment(e.target.value)}}
                        />         
           </div>

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Minus