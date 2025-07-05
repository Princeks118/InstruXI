import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
     userName:String,
     userEmail:String,
     password:String,
     role:String
})

export const User=mongoose.model('User',UserSchema);