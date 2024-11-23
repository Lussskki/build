import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

// Middleware for verify generated token 
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    // Token not existing
    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided'})
    }

    // Token is accessable
    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        
        
        req.user = decoded
        // console.log('Auth: User from token:', req.user); // Check if user is properly parsed

        next()
    }catch(error){
        return res.status(400).json({message: 'Invalid or expired token'})
    }
}

export default authMiddleware