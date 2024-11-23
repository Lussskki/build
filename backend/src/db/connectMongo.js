import mongoose from "mongoose"
import signale from "signale"
import dotenv from 'dotenv'
dotenv.config()

// Connect to mongo db with connection string 
const connectionString = process.env.MONGO_URI

try{
    mongoose.connect(connectionString)
    signale.success('Mongodb is connected to server')
}catch (err){
    signale.error('Mongodb have error: ',err)    
}

export default mongoose