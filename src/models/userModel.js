import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    username: {
        type: 'String',
        required: [true, 'Plese Provide a username'],
        unique: true,
    },
    email: {
        type: 'String',
        required: [true, 'Plese Provide a email'],
        unique: true,
    },
    password: {
        type: 'String',
        required: [true, 'Plese Provide a password']
    },
    isVerified: {
        type: 'boolean',
        default: false
    },
    isAdmin: {
        type: 'boolean',
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})


const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User
