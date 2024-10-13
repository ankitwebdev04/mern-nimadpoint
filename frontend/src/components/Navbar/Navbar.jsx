import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({ setShowLogin }) => {

    // created a state variable and initialized it with menu
    const [menu, setMenu] = useState("menu");

    const{getTotalCartAmount} = useContext(StoreContext);
    return (
        <div className='navbar'>
           <Link to="/"> <img src={assets.logo} alt="" className="logo" /> </Link>
            <ul className="navbar-menu">
                {/*  we have added the dynamic class names on the list shown below..!
        Comparing menu if it is home so we provide a classname which is active and if not home
        then provided empty string...!Same goes for menu, mobile-app and contact-us 
        
        so it is depend on the state if it is home/ menu/mobile-app/contact-us*/}

        {/* logic underline effect for this menubar */}
                <Link to={"/"} onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} />
                <div className="navbar-search-icon">
                  <Link to="/cart"><img src={assets.basket_icon} alt='' /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>sign in</button>
            </div>
        </div>
    )
}

export default Navbar
