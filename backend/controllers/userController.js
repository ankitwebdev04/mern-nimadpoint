import userModel from "../models/userModel.js";
// jwt for authentication
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";
import validator from "validator";
import create from "create";

//login user 
const loginUser =  async (req,res) => {
    const {email,password} = req.body;
    try {
        // by using this if any account is  avail. then the useraccount will store in this variable
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"User Doesn't Exist"})
        }
        //so here the password is the user entered while login and the user.password shows the pass stored in the database
        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        // if the password matches we will generate a token
        const token = createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
                
    }

}
// created token and send token to user as a response 
//id we get from user selfgenerated using mongodb
// in return jwt.sign  store the id and we provide salt so the data will be encrypted
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {

    // destructure the name,password,email from req.body
    const {name,password,email} = req.body;
    try {
        // checking is user already exist
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success:false,message:'User already exist'})
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please enter a valid email'})
        }
        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            // name and user we get from reqbody and the passworwe are using is hashedpassword
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save() 
        const token = createToken(user._id)// token generated
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}