import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

// destructure the url here which we have used in app.jsx file as a prop
const Add = ({url}) => {

  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",  // we have stored this price as a string
    category:"Salad"
  })
    // passing event so that when we update any input field that event will update in this function parameter
  const onChangeHandler = (event) => {
    // extracted the name and value from this event 
    const name = event.target.name;
    const value = event.target.value;
    // Datahandler where we passed the previous data with field name also update the value with new value which we get from event 
    setData(data=>({...data,[name]:value}))
  }
    // To Make API Calls
    const onSubmitHandler = async (event) => {
      event.preventDefault();
      // inserting all the fromdata which is image and the title desc.in 1 formdata
      const fromData = new FormData();
      fromData.append("name",data.name)
      fromData.append("description",data.description)
      fromData.append("price",Number(data.price)) // converting price into number using Number 
      fromData.append("category",data.category)
      fromData.append("image",image)
      //To call API we use axios
      const response = await  axios.post(`${url}/api/food/add`,fromData);// this endpoint where we upload product
      if (response.data.success) {
        setData({
          name:"",
          description:"",
          price:"",  // we have stored this price as a string
          category:"Salad"
        })
        setImage(false)
        toast.success(response.data.message) // react toastify notification function
      }
      else{
        toast.error(response.data.message)
      }
    }

  // to check wether our data is updated or not we use useEffect
  // whenever our data will update the useffect functtion will execute
  //    useEffect(()=>{
  //      console.log(data);
  //    },[data])

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          {/* image upload and preview logic */}
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
        </label>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
      </div>
      <div className="add-product-name flex-col">
      <p>Product name</p>
      <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="add-product-description flex-col">
      <p>Product description</p>
      <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='Write content here' required></textarea>
      </div>
      <div className="add-category-price">
        <div className="add-category flex-col">
          <p>Product Category</p>
          <select onChange={onChangeHandler} name="category">
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="add-price flex-col">
          <p>Product Price</p>
          <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
        </div>
      </div>
      <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add;
