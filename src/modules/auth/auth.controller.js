import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { sendEmail } from '../../utils/sendEmail.js'

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body
    const userExist = await User.findOne({ email })
    // check user existance
    if (userExist) {
        return next(new AppError('user already exists'), 409)
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8)
    // prepare user
    const user = new User({
        userName,
        email,
        password: hashedPassword
    })
    // save user in database
    const createdUser = await user.save()
    // remove password from the response
    createdUser.password = undefined
    const token = jwt.sign({ email }, 'Key')
    sendEmail(token, email)
    return res.status(201).json({ message: 'user created successfully', success: true, data: createdUser })
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    const userExist = await User.findOne({ email })
    // check user existance
    if (!userExist) {
        return next(new AppError('invalid Credentials'), 401)
    }
    const correctPassword = bcrypt.compareSync(password, userExist.password)
    if (!correctPassword) {
        return next(new AppError('invalid Credentials'), 401)
    }
    const accessToken = jwt.sign({ email,userId:userExist._id }, "Key")
    return res.status(200).json({ message: 'logged in successfully', success: true, accesstoken: accessToken })
}