import joi from 'joi'

export const signupVal = joi.object({
    userName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    rePassword:joi.valid(joi.ref('password')).required()
}).required()

export const signinVal = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).required()
