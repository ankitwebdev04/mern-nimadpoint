import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // on req we dont send the id we send the token and the middleware will conver the token in userid
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
         
        // if the user 1 to add the product in the cart with 1 product id and from that item id 
        //there's no entry in the cart in that case this will create a new entry.
        if (!cartData[req.body.itemId]) 
        {
            cartData[req.body.itemId] = 1;
         }
         else{
            cartData[req.body.itemId] += 1;
         }
         await  userModel.findByIdAndUpdate(req.body.userId,{cartData});
         res.json({success:true,message:"Added to Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'});
    }  
    
}


// remove items from usercart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        //from the userdata we have stored cart data in this variable
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -=1; 
        }
        // to update the new cartData
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Remove From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}

export { addToCart, removeFromCart, getCart }