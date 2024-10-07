import React, { useState } from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'
const Navbar = () => {

    // created a state variable and initialized it with home
    const [menu, setMenu] = useState("home");

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="" className="logo" />
            <ul className="navbar-menu">
                {/*  we have added the dynamic class names on the list shown below..!
        Comparing menu if it is home so we provide a classname which is active and if not home
        then provided empty string...!Same goes for menu, mobile-app and contact-us 
        
        so it is depend on the state if it is home/ menu/mobile-app/contact-us*/}

        {/* logic underline effect for this menubar */}
                <li onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
                <li onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
                <li onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
                <li onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt='' />
                    <div className="dot"></div>
                </div>
                <button>sign in</button>
            </div>
        </div>
    )
}

export default Navbar
