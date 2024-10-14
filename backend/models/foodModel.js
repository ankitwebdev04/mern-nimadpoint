import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image: {type:String,required:true},
    category: {type:String,required:true}
})

//we can create the model only once but when we run the file again it will create the model again.
// so if the model is available it will use and if not then it will use the other one shown after the operator
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;