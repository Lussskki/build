import UserSchema from '../db/schema/userSchema.js'

import express from 'express'

import bcrypt from 'bcrypt'

import { generateToken } from '../utils/jwtUtils.js'

import dotenv from 'dotenv'
dotenv.config()



const secondRouter = express.Router()



// Login router
secondRouter.post('/', async (req, res) => {
    const { email, password } = req.body

    // Check email and password
    if (!email || !password) {
        return res.status(400).json({ message: `Both email and password are required` })
    }

    try {
        // Find user by email
        const user = await UserSchema.findOne({ email })

        // If user is not found
        if (!user) {
            return res.status(401).json({ message: `Not found email or password` })
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: `Invalid email or password` })
        }

        // Generate JWT token
        const token = generateToken(user._id)

        // Send token to client and log success message
        return res.status(200).json({ message: `Login successful`, token })
    } catch (err) {
        // Error handling
        return res.status(500).json({ message: `Error during login`, err })
    }
})

// // GET /tasks (or /data) - Fetch inputted data for the authenticated user
// secondRouter.get('/data', async (req, res) => {
//     try {
//         const userId = req.user.userId  // Extract userId from the token
//         const {infos} = req.params
//         const data = await Info.find({ infos });  // Fetch data from Info schema

//         if (!data || data.length === 0) {
//             return res.status(404).json({ message: 'No data found for this user.' });
//         }
 
//         res.status(200).json({ message: 'Data fetched successfully', data });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching data', error });
//     }
// });


export default secondRouter
