import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User', userSchema);
export default userModel;