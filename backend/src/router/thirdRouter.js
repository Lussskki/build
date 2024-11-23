import Info from '../db/schema/infoSchema.js'
import authMiddleware from '../middleware/authMiddleware.js'
import express from 'express'




const thirdRouter = express.Router()
// Add task
// Third router for info, that goes in database
// POST /api/addInfo/ - Add a new task
thirdRouter.post('/add', authMiddleware, async (req, res) => {
    const { field1 } = req.body;

    // Validate incoming data
    if (!field1) {
        return res.status(400).json({ message: 'Field1 is required' });
    }

    try {
        // Create a new instance with the data from the request
        const newData = new Info({
            field1,
            userId: req.user.userId // Store the userId from the token if relevant
        });

        // Save to the database
        await newData.save();

        // If successful, send a 201 response
        return res.status(201).json({ message: 'Added successfully', data: newData });
    } catch (error) {
        // If there's an error, send a 500 response
        return res.status(500).json({ message: 'Error saving data', error });
    }
});

// GET /api/addInfo - Fetch tasks that belong to the logged-in user
// thirdRouter.get('/tasks', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.userId; // Get userId from the token

//         // Find tasks that belong to the logged-in user
//         const tasks = await Info.find({ userId });

//         return res.status(200).json({ message: 'Tasks fetched successfully', data: tasks });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error fetching tasks', error });
//     }
// });



export default thirdRouter