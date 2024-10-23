import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'

const App = () => {

const[showLogin,setShowLogin] = useState(false)

  return (
    <>
    {/* Ternary operator- is showLogin is true we have to display our component 
    and if it is false we will return the fragmet*/}
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} 
    <div className='app'>
      {/* passing the prop setshowLogin in navbar after this copy the prop
       and destructure it in Navbar.jsx file navigation bar component */}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify'element={<Verify />}/>
      </Routes>
    </div>
      <Footer />
    </>

  )
}

export default App
