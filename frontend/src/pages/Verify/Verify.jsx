import React, { useContext, useEffect, useState } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    //we will get the backend url from the context api
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        // if the condition is true we will navigate the users on different routes
        if (response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=> {
        verifyPayment();
    },[])

  //  console.log(success,orderId);
    

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify;
