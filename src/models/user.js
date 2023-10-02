import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age should be a positive number')
            }
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: [6, 'Minimum 6 characters'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not include \'password\'')
            }
        },
    }
})

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema)

export default User