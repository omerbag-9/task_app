import { model, Schema } from "mongoose";
// schema

const taskSchema = new Schema({
    task: [{
        type: String,
        required: true
    }],
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'Category'
    },
    categoryName:{
        type:String,
    },
    status:{
        type: String,
        enum: ['public', 'private'],
        required: true  
    }
},{timestamps:true})


// model

export const Task = model('Task' , taskSchema)