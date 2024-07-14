import mongoose from "mongoose"

export const connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/task').then(()=>{
        console.log('db is connected successfully');
    }).catch((err)=>{
        console.log('failed to connect to db');
    })
}