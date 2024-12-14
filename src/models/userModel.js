import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    role: {
        type:String,
        required: true,
        enum: ["admin","manager", "user"]
    }
},{timestamps:true})

const userModel = mongoose.model('User',userSchema);
export default userModel;