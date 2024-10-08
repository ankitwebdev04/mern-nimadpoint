import React from 'react';
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';

// WE will mount this explore menu to Home.jsx file
const ExploreMenu = ({category,setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delactable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            <div className="explore-menu-list">

                {/* here we are using the menu list with map method in arrow function 
    we pass the individual item and index number and used return statment we have used
    key property and passed index also we have added img tag and in src we have passed
     item.menu_image*/}
                {menu_list.map((item, index) => {
                    return (  
                        // passing an arrow function and  called the setCategory function
                        // check if PREVious state is same as item menu name we set the state "All" 
                        //and if not same we set state with menu name..
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>

                            {/* item is one object here..where we have the property menu_image */}
                            {/* if the category is same wit menuname we added class "active" 
                            and if not the same we have provided an empty string "" */}
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='' />
                            <p>{item.menu_name}</p>

                        </div>
                    )
                })}
            </div>
            <hr/> {/* This hr tag is used for horizontal line after the menu items  */}
        </div>
    )
}

export default ExploreMenu
