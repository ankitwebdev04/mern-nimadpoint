// to decode the token we use middleware and we provide the name authentication middleware

import jwt from "jsonwebtoken";
const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorised Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
  // this middleware take the token and conver it into userid and with that id we can add remove or get the data from the cart      
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

export default authMiddleware;
// we will add this in cartroute.js
