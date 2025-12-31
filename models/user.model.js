const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength:[3,'Username must be at least 3 characters long']
    },
   age : {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age seems unrealistic'] 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [13, 'Email must be at least 13 characters long']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;