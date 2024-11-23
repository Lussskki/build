import mongoose from "mongoose"

// User schema for mongodb 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        validate: {
            validator: function (v) {
                // regex to check if contains "@"
                 return /^.+@.+\..+$/.test(v)
            },
            message: props => `${props.value} is not valid email! Email must contain "@"`
        }
    },
    password: {
        type: String,
        required: true
    }
})

const UserSchema= mongoose.model('Text', userSchema)

export default UserSchema
