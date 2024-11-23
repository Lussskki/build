import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Info from '../db/schema/infoSchema.js';  // Import Info model
// import UserSchema from '../db/schema/userSchema.js';  // Import User model


const protectedRouter = express.Router();

// GET /profile - Fetch user profile

// protectedRouter.get('/userProfile', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.userId;  // Extract userId from the token
//         const user = await UserSchema.findById(userId).select('-password');  // Exclude password
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         console.log(user)
//         res.status(200).json({ message: 'Profile fetched successfully', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching profile data', error });
//     }
// });

// GET /tasks (or /data) - Fetch inputted data for the authenticated user
protectedRouter.get('/data', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId  // Extract userId from the token
        // const {infos} = req.params
        const data = await Info.find({ userId });  // Fetch data from Info schema

        // console.log(res.json({data}))
        // if (!data || data.length === 0) {
        //     return res.status(404).json({ message: 'No data found for this user.' });
        // }
 
        return  res.status(200).json({ message: 'Data fetched successfully', data });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching data', error });
    } 
});

// DELETE /:id
protectedRouter.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;  // Note the change: destructuring `id` instead of `_id`
        const userId = req.user.userId

        const mongoDbData = await Info.findOneAndDelete({ _id: id, userId });

        if (!mongoDbData) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return  res.status(200).json({ message: 'Task deleted successfully', deletedTask: mongoDbData });
    } catch (error) {
        console.error('Error deleting task:', error);
        return  res.status(500).json({ message: 'Server error.' });
    }
});












export default protectedRouter;
