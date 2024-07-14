import { model, Schema } from "mongoose";
// schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

// model

export const User = model('User' , userSchema)