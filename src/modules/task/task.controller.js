import { Category } from "../../../db/models/category.model.js"
import { Task } from "../../../db/models/task.model.js"
import { AppError } from "../../utils/AppError.js"

export const addTask = async (req, res, next)=>{
    const {task , status} = req.body
    const {categoryId} = req.params
    const {userId} = req.user

    const categories = await Category.findById(categoryId)
    if(!categories){
        next(new AppError('category is not found',404))
    }

    const tasks = new Task({
        task,
        category:categoryId,
        categoryName:categories.category,
        userId,
        status
    })
    const createdTask = await tasks.save()
    return res.status(200).json({message:"task added successfully" , success:true ,data:createdTask})
}

export const upadtedTask = async (req, res, next) => {
    const { userId } = req.user
    const {task} = req.body
    const { taskId} = req.params
    const taskExist = await Task.findOne({userId ,_id:taskId})
    if (!taskExist) {
        return next(new AppError('task not found', 404))
    }
    const updatedCategory = await Task.findOneAndUpdate({userId,_id:taskId} , {task} , {new:true})
    return res.status(200).json({ data: updatedCategory, success: true })
}


export const deletedTask = async (req, res, next) => {
    const { userId } = req.user
    const {taskId} = req.params
    const taskExist = await Task.findOne({userId ,_id:taskId })
    if (!taskExist) {
        return next(new AppError('task not found', 404))
    }
    await Task.findByIdAndDelete({userId,_id:taskId})

    return res.status(200).json({ message:"task deleted successfull", success: true })
}



export const getTask = async (req, res, next) => {
    const { userId } = req.user || {};
    const { taskId } = req.params;

    try {
        const taskExist = await Task.findOne({ _id: taskId });

        if (!taskExist) {
            return next(new AppError('Task not found', 404));
        }

        // Check if the task is private
        if (taskExist.status === "private") {
            // Check if the user is the owner of the task
            if (!userId || taskExist.userId.toString() !== userId.toString()) {
                return next(new AppError('This task is private and you do not have access to it', 401));
            }
        }

        return res.status(200).json({ data: taskExist, success: true });
    } catch (error) {
        return next(new AppError('An error occurred while retrieving the task', 500));
    }
};


export const getAllTasks = async (req, res, next) => {
    try {
        const { userId } = req.user; // Assuming req.user is set by authentication middleware

        const { status, categoryName, page = 1, limit = 10 } = req.query;
        const query = { userId }; // Filter by userId instead of owner

        if (status) {
            query.status = status;
        }
        if (categoryName) {
            query.categoryName = categoryName;
        }

        const skip = (page - 1) * limit;

        // Query tasks based on the constructed query object
        const tasks = await Task.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('category', 'categoryName');

        // Count total tasks matching the query
        const totalTasks = await Task.countDocuments(query);

        // Return tasks, totalPages, and currentPage in the response
        res.status(200).json({ 
            tasks, 
            totalPages: Math.ceil(totalTasks / limit), 
            currentPage: parseInt(page) 
        });
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
};
