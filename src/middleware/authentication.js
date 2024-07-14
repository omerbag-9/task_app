import jwt  from "jsonwebtoken"
import { AppError } from "../utils/AppError.js"

export const auth = (req, res, next) => {
    const { authorization } = req.headers;
    
    // check if user not authenticated return req.user to null
    if (!authorization) {
        req.user = null;
        return next();
    }

    const [key, token] = authorization.split(' ');

    if (key !== 'Bearer' || !token) {
        return next(new AppError('invalid Bearer Key',401));
    }

    try {
        const payload = jwt.verify(token, "Key");
        req.user = payload;
    } catch (error) {
        return res.json({error})
    }

    next();
};
