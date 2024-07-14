import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import { addTask , deletedTask, getAllTasks, getTask, upadtedTask } from "./task.controller.js";


export const taskRouter = Router()


taskRouter.use(auth)

// add task
taskRouter.post('/:categoryId', addTask)

// update task
taskRouter.put('/:taskId', upadtedTask)

// delete task
taskRouter.delete('/:taskId', deletedTask)

// get  task
taskRouter.get('/:taskId', getTask)

// get all task and filter
taskRouter.get('/', getAllTasks)

