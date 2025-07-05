import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
const app=express();
import auth from "./routes/auth-routes/index.js"
import media from "./routes/instructor-routes/media-routes.js"
import courses from "./routes/instructor-routes/course-routes.js"
import studentview from "./routes/student-routes/course-routes.js"
import studentorder from "./routes/student-routes/order-routes.js"
import studentcoursesroute from "./routes/student-routes/student-courses-routes.js"
import studentcourseprogress from "./routes/student-routes/course-progress-routes.js"
const PORT=process.env.PORT || 8080;
const FRONTEND_URL=process.env.FRONTEND_URL;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

console.log("JAI SHREE RAM");
app.use(cors({
    origin:FRONTEND_URL,
    credentials:true,
    methods:["POST","GET","PUT","DELETE"],
    allowedHeaders:['Content-Type','Authorization']

}))
async function Connectdb() {
      try {
        const MONGO_URI=process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI);
        console.log("DB connected sucessfully");
      } catch (error) {
        console.log("error in db connection");
      }
}

Connectdb();

app.use("/health",(req,res)=>{
     res.send({
        message:"heelo from backend",
        sucess:true,
     })
})
app.use('/auth',auth);
app.use('/media',media);
app.use('/instructor/course',courses);
app.use("/student/course",studentview);
app.use("/student/order",studentorder);
app.use("/student/courses-bought",studentcoursesroute);
app.use("/student/course-progress",studentcourseprogress);

app.listen(PORT,()=>{
     console.log(`server running on ${PORT}`);
})
