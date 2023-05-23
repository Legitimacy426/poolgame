import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'
import useFetchPlayers from "./hooks/useFetchPlayers"

const Edit = () => {
   
    const { cat,id,q } = useParams()
      
   
    const [name,setName] = useState(cat)
    const [status,setStatus] = useState('Active')


    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
        const docRef = doc(db, 'tables', id)
        if (status == "Deactivate") {
            Swal.fire({
                title: `Are you sure you want to deactivate ${cat} ?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes,deactivate it',
                denyButtonText: `No`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    updateDoc(docRef, {
                        status: status,
                        name:name,
                        createdAt: serverTimestamp(),
                       
                    }).then(() => {
                        // success
                     
                        Swal.fire(
                            'Deactivated',
                            `Deactivated ${cat} successifully`,
                            'success'
                          )
                    }).catch(e => {
                        Swal.fire(
                            'error',
                            `${e.message}`,
                            'error'
                          )
                       
                    })
                    
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })  
        } else {
            updateDoc(docRef, {
                status: status,
                name:name,
                createdAt: serverTimestamp(),
               
            }).then(() => {
                // success
             
                Swal.fire(
                    'success',
                    `Updated to ${name} `,
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
      
      
        

        
        
   }
    return (
        <div className="main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                    <h3>Edit { cat}</h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Table Name</label>
                        <input
                            required
                           placeholder={cat}
                            type="text"
                            name="quantity"
                            id=""
                            value={name}
                            onChange = {(e)=>{setName(e.target.value)}}
                        />         
           </div>
     
        <div className="form-group">
                        <label htmlFor="">status</label>
                        <select name="status" onChange={(e)=>{setStatus(e.target.value)}} id="">
                            <option value="Active">Active</option>
                     
                            <option value="Deactivate">Deactivate</option>
                        </select>       
           </div>
      

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Edit