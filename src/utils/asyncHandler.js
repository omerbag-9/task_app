import { AppError } from "./AppError.js";

export function asyncHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            return next(new AppError(err.message, err.stausCode))
        })
    }
}

export const globaleErrorHandler = (err, req, res, next) => {
    if (req.errorArr) {
        return res.status(err.statusCode || 500).json({ message: req.errorArr, success: false })
    }
    return res.status(err.statusCode || 500).json({ message: err.message, success: false })
}