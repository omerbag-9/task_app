import { Router } from "express";
import { addCategory,deleteCategory,getCategory, updateCategory } from "./category.controller.js";
import { auth } from "../../middleware/authentication.js";

export const categoryRouter = Router()

categoryRouter.use(auth)

// add category
categoryRouter.post('/',addCategory)

// get category
categoryRouter.get('/:id',getCategory)

// delete category
categoryRouter.delete('/:id',deleteCategory)

// update category
categoryRouter.put('/:id',updateCategory)
