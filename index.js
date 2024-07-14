// import modules

import express from 'express'
import jwt  from 'jsonwebtoken'
import { connectDB } from './db/connection.js'
import { globaleErrorHandler } from './src/utils/asyncHandler.js'
import { User } from './db/models/user.model.js'
import { authRouter, categoryRouter, taskRouter } from './src/index.js'


// create server

const app = express()
const port = 3000

// connect to database

connectDB()

// parse data

app.use(express.json())

// routers

app.use('/auth',authRouter)
app.use('/category',categoryRouter)
app.use('/task',taskRouter)

// send email router

app.get('/verify/:token', async(req,res,next)=>{
    try{
        const {token} = req.params
    const payload = jwt.verify(token,'Key')
    await User.findOneAndUpdate({email:payload.email},{emailVerified:true})
    return res.status(200).json({message:'your email is verified successfully go to login'})
}
catch(err){
    return res.status(err.cause || 500).json({ message: err.message, success: false })
}
})

// global error handler

app.use(globaleErrorHandler)

// listen on server

app.listen(port , ()=>{
    console.log('server is running on port',port);
})