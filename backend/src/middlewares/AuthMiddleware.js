import jwt from "jsonwebtoken"
import User from "../models/UserModel.js";

const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            res.status(401).json({status: 401, error: "Unauthorized request"})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            res.status(401).json({status: 401, error: "Invalid Access Token"})
        }
    
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({status: 401, error: error?.message || "Invalid access token"})
    }   
}

export const hasRole = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
            
            if (!token) {
                res.status(401).json({status: 401, error: "Unauthorized request"})
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
            if (!user) {
                res.status(401).json({status: 401, error: "Invalid Access Token"})
            }
        
            if (roles.includes(user.role)) {
                req.user = user;
                next()
            }
            
            res.status(403).json({status: 403, error: "Unauthorized request"})
        } catch (error) {
            res.status(401).json({status: 401, error: error?.message || "Invalid access token"})
        }   
    }
}

export default verifyJWT