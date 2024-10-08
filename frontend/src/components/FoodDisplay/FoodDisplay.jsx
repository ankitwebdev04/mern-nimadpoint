import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

    // category destruct here 
function FoodDisplay({category}) { 

    const {food_list} = useContext(StoreContext) 

  return (
    /*we mount this food display component in Home.jsx file */
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
                //we will return a component that will give the food data and will display in a cart
                return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            })}
        </div>
    </div>
  )
}

export default FoodDisplay
