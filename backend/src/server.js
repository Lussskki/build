import express from 'express';


import './db/connectMongo.js';  // MongoDB connection

import firstrouter from './router/firstRouter.js';
import secondRouter from './router/secondRouter.js';
import thirdRouter from './router/thirdRouter.js';
import protectedRouter from './router/protectedRouter.js';

import bodyParser from 'body-parser';
import cors from 'cors';

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

// Use environment variables for CORS configuration
const allowedOrigin = process.env.FRONTEND_URL || FRONTEND_URL;
const allowedMethods = process.env.ALLOWED_METHODS ? process.env.ALLOWED_METHODS.split(',') : ['GET', 'POST', 'DELETE'];


// CORS setup to allow frontend to access the API
app.use(cors({
    origin: allowedOrigin,
    methods: allowedMethods
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());


// Use your defined routes
app.use('/api/signup', firstrouter);
app.use('/api/login', secondRouter);
app.use('/api/addInfo', thirdRouter);
app.use('/api/profile', protectedRouter);

// Serve static files from the React frontend build directory
app.use(express.static(path.join(path.resolve(), 'frontend/build')));

// Catch-all route to handle React Router (frontend routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
