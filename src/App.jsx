import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard  from './components/Dashbord'
import Cat from './components/Cat'
import Minus from './components/Minus'
import Add from './components/Add'
import Edit from './components/Edit'
import Register from './components/Register'
import Match from './components/Match'
import EditMatch from './components/EditMatch'
import UserDashboard from './components/user/UserDashboard'
import Bet from './components/user/Bet'
import Withdraw from './components/user/Withdraw'
import Deposit from './components/user/Deposit'
import Details from './components/user/Details'

function App() {


  return (
    <Router>
      <Routes>
        

        
        <Route path='/' element={<Login />}  />
        <Route path='dashboard' element={<Dashboard />}  />
        <Route path='table' element={<Cat />}  />
        <Route path='add/:cat/:id/:q' element={<Add />}  />
        <Route path='minus/:cat/:id/:q' element={<Minus />}  />
        <Route path='edit/:cat/:id/:q' element={<Edit />}  />
        <Route path='editmatch/:cat/:id/:q' element={<EditMatch />}  />
        <Route path='register' element={<Register />}  />
        <Route path='match' element={<Match />} />
        {/* user routes */}
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='bet/:cat/:id/:q' element={<Bet />} />
        <Route path='betdetails/:id/:mid' element={<Details />} />

     
      </Routes>
   </Router>
  )
}

export default App
