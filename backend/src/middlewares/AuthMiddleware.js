import jwt from "jsonwebtoken"
import User from "../models/UserModel.js";

const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            return res.status(401).json({status: 401, error: "Unauthorized request"})
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res.status(401).json({status: 401, error: "Invalid Access Token"})
        }
    
        req.user = user;
        return next()
    } catch (error) {
        return res.status(401).json({status: 401, error: "Invalid access token"})
    }   
}

export const hasRole = (roles) => {
    return async (req, res, next) => {
        try {
            if (roles.includes(req.user.role)) {
                return next()
            }
            
            return res.status(403).json({status: 403, error: "Unauthorized request"})
        } catch (error) {
            return res.status(401).json({status: 401, error: "Invalid access token"})
        }   
    }
}

export default verifyJWT