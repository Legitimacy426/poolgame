import { createUserWithEmailAndPassword, } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs, serverTimestamp, addDoc} from "firebase/firestore"
import { useState } from "react"
import { useParams,Link } from "react-router-dom"
import { auth, db } from "./firebase.config"
import Swal from 'sweetalert2'

const Register = () => {
   
 
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [password, setPassword] = useState()
    const [isError, setError] = useState()
    const handleSumbit = (e) => {
        e.preventDefault()
       
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
            // success
                const uid = cred.user.uid
                const account = {
                    userId: uid,
                    email: email,
                    balance: 0,
                    createdAt: serverTimestamp(),
                    role: "user"
                }
                const userRef = collection(db, 'accounts')
                addDoc(userRef, account).then(() => {
                    Swal.fire(
                        'success',
                        `You can login as ${email}`,
                        'success'
                      )
                }).catch((e) => {
                    Swal.fire(
                        'error',
                        `${e.message}`,
                        'error'
                      )
            })
                 
                
            }).catch((e) => {
                Swal.fire(
                    'error',
                    `${e.message}`,
                    'error'
                  )
        })
   }
    return (
        <div className="main main-form">
            
            <div className="card form-card">
               
                <form  onSubmit={handleSumbit}>
                    
               
              <br />
                        <h3>Register to 8Balls </h3> 
                    
        <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input
                            required
                            placeholder="Enter valid email address"
                            type="email"
                            name="email"
                            id=""
                            value={email}
                            onChange = {(e)=>{setEmail(e.target.value)}}
                        />         
           </div>
      
        <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
                            placeholder="Create password"
                            required
                            type="password"
                            name="password" id=""
                            value={password}
                            onChange = {(e)=>{setPassword(e.target.value)}}
                        />         
                    </div>
                   
                    <button className="submit">Register</button>
                    {isError && <p className="error">{isError}</p>} 
                    <p>Already a memeber? <Link to='/'>Login account</Link> </p>

               
        </form>
             </div>
        </div>
    )
}

export default Register