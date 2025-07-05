
import mongoose from "mongoose";
const LectureSchema=new mongoose.Schema({
    title:String,
    videoUrl:String,
    public_id:String,
    freePreview:Boolean
})
const courseSchema=mongoose.Schema({
     instructorId:String,
     instructorName:String,
     date:Date,
     title:String,
     category:String,
     level:String,
     language:String,
     subtitle:String,
     description:String,
     image:String,
     welcomeMessage:String,
     pricing:Number,
     primaryLanguage:String,
     objectives:String,
     students:[
        {
            studentId:String,
            studentName:String,
            studentEmail:String,
        }
     ],
     curriculum:[LectureSchema],
     isPublised:Boolean,
})

export const Course=mongoose.model('Course',courseSchema);