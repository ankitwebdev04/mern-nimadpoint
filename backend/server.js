 import express from "express";
 import cors from   "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


 // app config
 const app = express()
 const port = 4000

 // middleware 

  // using this middleware whenevr we get  the req.from frontend to backend  that will be parsed using json
 app.use(express.json())   

 // using this we can access backend from frontend                         
app.use(cors())

// db connection 
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
// we have mount the uploads folder at /images.So it means we can access bt using /images/filename
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
//to run the express server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// 

