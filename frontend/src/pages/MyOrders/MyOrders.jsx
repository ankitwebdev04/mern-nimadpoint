import React, { useContext, useEffect, useState } from 'react';
import "./MyOrders.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    //backendurl,authentication 
    const {url,token} = useContext(StoreContext);
// we can fetch the users data and state it in a variable
const [data,setData] = useState([]);

const fetchOrders = async () => {
    // here it will call the api and we get response 
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    setData(response.data.data);
    
}
// we have to call the function whenever the state variable is loaded
useEffect(() => {
    if (token) {
        fetchOrders();
    }
},[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index) => {
                return(
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) => {
                            // using this we can access the last item of an order
                            if (index === order.items.length-1) {
                                return item.name+" x " +item.quantity
                            }
                            else{
                                return item.name+" x " +item.quantity+" , "

                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
