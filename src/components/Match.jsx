import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, addDoc, serverTimestamp, updateDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'
import useFetchPlayers from "./hooks/useFetchPlayers"
import useFetchCat from "./hooks/useFetchcat"

const Match = () => {

      const {cards : tables} = useFetchCat('all')
  
    const [name,setName] = useState('')
    const [status, setStatus] = useState('Active')
    const [tbl,setTbl] = useState('')
   

    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
        const docRef = collection(db, 'matches')
        const match = {
            name: name,
            createdAt: serverTimestamp(),
            winner: '',
            status: 'off',
            tableId:tbl
        }
        addDoc(docRef, match).then(() => {
            
            Swal.fire(
                'Success',
                `Match created`,
                'success'
              )
        }).catch(e => {
            
            Swal.fire(
                'Error',
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
                    <h3>Create a match</h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Match Name</label>
                        <input
                            required
                      
                            type="text"
                            name="quantity"
                            id=""
                            value={name}
                            onChange = {(e)=>{setName(e.target.value)}}
                        />         
           </div>
     
        <div className="form-group">
                        <label htmlFor="">Pool Table</label>
                        <select name="status" onChange={(e)=>{setTbl(e.target.value)}} id="">
                            {tables.map(table => (
                                <option value={table.id}>{ table.name}</option>
                        ))}
                        </select>       
           </div>
        {/* <div className="form-group">
                        <label htmlFor="">Status</label>
                        <select name="status" onChange={(e)=>{setStatus(e.target.value)}} id="">
                            <option value="on">On</option>
                            <option value="off">Off</option>
                            <option value="Deactivate">Deactivate</option>
                        </select>       
           </div> */}
        
    

                   
                    <button className="submit">Continue</button>
                    {isError && <p className="error">{isError}</p>}  
               
        </form>
             </div>
        </div>
    )
}

export default Match