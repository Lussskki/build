import express from 'express';
import UserSchema from '../db/schema/userSchema.js';
import bcrypt from 'bcrypt';

const firstRouter = express.Router();

const saltRounds = 10;

// Signup router
firstRouter.post('/', async (req, res) => {
    // console.log('Request data:', req.body)
  // Necessary information from the request body
  const { name, lastName, email, password } = req.body;

  // Check if fields are present
  if (!email || !password || !name || !lastName) {
    return res.status(400).json({ message: 'All info are required' });
  }

  // Password characters check
  if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ message: 'Password must be between 8 and 16 characters!' });
  }

  try {
    // Check if email already exists
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new instance of UserSchema
    const newUser = new UserSchema({ email, name, lastName, password: hashedPassword });

    // Save to MongoDB 
    await newUser.save();

    // Exclude password from the response
    const userWithoutPassword = {
      ...newUser.toObject(),
      password: undefined, // Don't send the password back
    };

    return res.status(201).json({ message: 'Signup successful', user: userWithoutPassword });
  } catch (error) {
    return res.status(500).json({ message: 'Error with adding user', error });
  }
});

export default firstRouter;
