// ADDED CONTROLLER FUNCTION TO ADD FOOD ITEMS REMOVE THE FOOD AND LIST THE FOOD

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

// all food list
    const listFood = async (req,res) => {
        try {
            const foods = await foodModel.find({});
            res.json({success:true,data:foods})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
    }

 // remove food item
 const removeFood = async (req,res) => {
    try {
        // find the foodmodel by ID
        const food = await foodModel.findById(req.body.id);
        // here food image will be delete from upload folder 
        fs.unlink(`uploads/${food.image}`,()=>{})
        // food data will delete from DB
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
 }

// exporting an object{}
export {addFood,listFood,removeFood} 