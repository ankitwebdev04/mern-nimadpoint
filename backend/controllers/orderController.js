import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend
const placeOrder = async (req,res) => {

    const frontend_url =  "http://localhost:5173";

    try {
        const newOrder = new orderModel ({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
             address:req.body.address
        })
        // save the order in the database
        await newOrder.save();
        // when the user will place the order after this we have to clear the users cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        {/*logic for payment link using the stripe where we create line items inside price
            data, currency, productdata, name, unitamount and quantity */}

        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                // we get data in dollar but into inr we multiply item price*100*80
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }) )
          //  to push the delivery charges in line items
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
             quantity:1 
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            // when the payment get successful we will redirect here where we have added rout verify
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

        } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const verifyOrder =async (req,res) => {
    const {orderId,success} = req.body;
    try {
        // while calling the api we pass this data as a string
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
        {/*arrow function with userorder name with adding the logic 
            we can send the usersorder using the api*/}  
            // users order for frontend
    const userOrders = async (req,res) => {
        try {
            // we will find all orders of that user using their userid  
            const orders = await orderModel.find({userId:req.body.userId});
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
    } 

export {placeOrder,verifyOrder,userOrders}