// ADDED CONTROLLER FUNCTION TO ADD FOOD ITEMS

import foodModel from "../models/foodModel.js";
import fs from 'fs'; // filesystem which is prebuilt in node js


// add food item

const addFood = async (req,res) => {
    // add logic in which we can store the product data in the DB

    // using these we will store the uploaded file name to the variable
    let image_filename = `${req.file.filename}`;
    
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

        // so whenever  we will hit this API..in the body we will send the above details in the backend using this function 
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
// exporting an object{}
export {addFood} 