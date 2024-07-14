import { Category } from "../../../db/models/category.model.js"
import { AppError } from "../../utils/AppError.js"

export const addCategory = async (req, res, next) => {
    const { category } = req.body
    const { userId } = req.user
    const categories = new Category({
        category,
        userId
    })
    const createdCategory = await categories.save()
    return res.status(200).json({ message: "category added successfully", success: true, data: createdCategory })
}


export const getCategory = async (req, res, next) => {
    const { userId } = req.user
    const {id} = req.params
    const categoryExist = await Category.findById({userId , _id:id})
    if (!categoryExist) {
        return next(new AppError('category not found', 404))
    }
    return res.status(200).json({ data: categoryExist, success: true })
}

export const updateCategory = async (req, res, next) => {
    const { category } = req.body
    const {userId} = req.user
    const {id} = req.params
    const categoryExist = await Category.findOne({userId,_id:id})
    if (!categoryExist) {
        return next(new AppError('category not found', 404))
    }
    const updatedCategory = await Category.findOneAndUpdate({userId,_id:id} , {category} , {new:true})

    return res.status(200).json({ message:"category updated successfully",  data: updatedCategory, success: true })
}


export const deleteCategory = async (req, res, next) => {
    const {userId} = req.user
    const {id} = req.params
    const categoryExist = await Category.findOne({userId,_id:id})
    if (!categoryExist) {
        return next(new AppError('category not found', 404))
    }
    await Category.findOneAndDelete({userId,_id:id})

    return res.status(200).json({ message:"category deleted successfully", success: true })
}

