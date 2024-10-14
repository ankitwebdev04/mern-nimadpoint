 import express from "express";
 import cors from   "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";



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

app.get("/",(req,res)=>{
    res.send("API Working")
})
//to run the express server
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// 

