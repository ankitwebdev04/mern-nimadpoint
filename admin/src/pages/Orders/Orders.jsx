import React from 'react';
import './Orders.css';
import { useState } from 'react';
import {toast} from "react-toastify";
import { useEffect } from 'react';
import axios from "axios";
import {assets} from "../../assets/assets.js";

// we get this url from app.jsx file where we have passed the url as a prop

const Orders = ({url}) => {

  // made a state to store the data coming from api
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response =  await axios.get(url+"/api/order/list");
    // if the condition is true we are getting the orderdata so we can store the orderdata in order stat
    if (response.data.success) {
    setOrders(response.data.data);
    console.log(response.data.data);
    }
      else{
        toast.error("Error")
      }
  }
//link this with select tag
  const statusHandler = async (event,orderId) => {
   // whenever we change the option from drop down the changes will be reflected in the database
   const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
   if (response.data.success) {
    await fetchAllOrders();
   }
    
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index) => {
                  if (index===order.items.length-1) {
                    return item.name + " x " +item.quantity
                  }
                  else{
                    return item.name + " x " + item.quantity +  ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" " +order.address.lastName }</p>
              <div className="order-item-address">
                <p>{order.address.street+", "}</p>
                {/* concat the city state country zipcode */}
                <p>{order.address.city+ ", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
