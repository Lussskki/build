import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
    field1: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Ensure this exists
    // Add other fields as necessary
});

const Info = mongoose.model('Info', InfoSchema);

export default Info;
