import { createUserWithEmailAndPassword, } from "firebase/auth"
import { getDoc ,doc,query,where ,collection, getDocs} from "firebase/firestore"
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
                            type="email"
                            name="email"
                            id=""
                            value={email}
                            onChange = {(e)=>{setEmail(e.target.value)}}
                        />         
           </div>
        {/* <div className="form-group">
                        <label htmlFor="">Phone</label>
                        <input
                            required
                            type="number"
                            name="phone"
                            id=""
                            value={phone}
                            onChange = {(e)=>{setPhone(e.target.value)}}
                        />         
           </div> */}
        <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input
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