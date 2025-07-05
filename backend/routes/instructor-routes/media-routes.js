import express from "express";
import multer from "multer";
import { deletemediafromcloudinary, uploadmediatocloudinary } from "../../helper/cloudinary.js";


const router=express.Router();

const upload=multer({dest:'uploads/'});
router.post('/upload',upload.single('file'),async(req,res)=>{
      try {
        const result=await uploadmediatocloudinary(req.file.path);
        res.status(200).json({
             success:true,
             data:result
        })
      } catch (error) {
        console.log("error while uplading")
        res.status(500).json({
            success:false,
            message:"error upload file"
        })
      }
})

router.delete('/delete/:id',async(req,res)=>{
     try {
         const {id}=req.params;
         if(!id){
             return res.status(400).json({
                 success:false,
                 message:"asset id is required"
             })
         }
         await deletemediafromcloudinary(id);
         return res.status(200).json({
             success:true,
             message:"asset deleted sucessfuly from cludinary"
         })
     } catch (error) {
            console.log("erroe delting file");
             res.status(500).json({
            success:false,
            message:"error deleting  file"
        })
     }
})
export default router;