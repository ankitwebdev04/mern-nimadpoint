import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer"; // using multer for image storage system

// created an express router 
// we can create get method,post method and other as well..
const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{ // added an arrow function and inside request,file,callback
        // also we have used the template literal to rename our file and give a unique name to each image
            return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

// so here we have used this upload middleware to upload the image that is created using multer 
foodRouter.post("/add",upload.single("image"),addFood)





export default foodRouter;