import { model, Schema } from "mongoose";
// schema

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamps:true})

// model

export const Category = model('Category' , categorySchema)