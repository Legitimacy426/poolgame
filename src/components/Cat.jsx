import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'

const Cat = () => {
   
 
    const [name,setName] = useState()

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
        const category = {
            name: name,
            createdAt: serverTimestamp(),
            
            status:"Active"
        }
        const docRef = collection(db, 'tables')
        addDoc(docRef, category).then(() => { 
           
            Swal.fire(
                'Success',
                `${name} added succesifully`,
                'success'
              )
        })
            .catch((e) => {
                Swal.fire(
                    'Success',
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
                        <h3>Add Pool Table</h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                            required
                            type="text"
                            name="category"
                            id=""
                            value={name}
                            onChange = {(e)=>{setName(e.target.value)}}
                        />         
           </div>

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Cat