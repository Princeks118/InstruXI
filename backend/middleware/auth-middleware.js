import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const verifytoken=(token,secret)=>{
     return jwt.verify(token,secret);
}

const JWT_SECRET=process.env.JWT_SECRET;
export const authenticate=async (req,res,next)=>{

     const authHeader=req.headers.authorization
     if(!authHeader){
        return res.status(401).json({
             success:false,
             message:"user is not authenticated"
        })
     }

     const token=authHeader.split(' ')[1];
     const payload=verifytoken(token,JWT_SECRET);
     req.user=payload;
     console.log(req.user,payload);
     next();
}