import mongoose from "mongoose";

//define the schema and inside object with properties name,email,password.cartData
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
    // so we have given minimize false coz if we dont add this the cart data will not be created 
    //coz we have not provided any data above on cardData so that this card data create without any data
},{minimize:false})

// if  the model is already created it will use and if not created it will create new model
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;