import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

// Function for generate token
export const generateToken = (userId) => {
    const payload = { userId }
    const secretKey = process.env.SECRET
    const expiresIn = '1h'

    return jwt.sign(payload, secretKey, { expiresIn })
}