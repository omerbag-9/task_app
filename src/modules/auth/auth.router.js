import { Router } from "express";
import { auth } from "../../middleware/authentication.js";
import { signin, signup } from "./auth.controller.js";
import { validate } from "../../middleware/validation.js";
import { signinVal, signupVal } from "./auth.validation.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const authRouter = Router()


// signup
authRouter.post('/signup',validate(signupVal),asyncHandler(signup))
// signin
authRouter.post('/sign-in',validate(signinVal),asyncHandler(signin))
