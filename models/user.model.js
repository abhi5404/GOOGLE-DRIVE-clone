const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [5, 'Username must be at least 5 characters long']
  },
  age: {
    type: Number,
    min: 0,
    max: 120
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
    minlength: [8, 'Password must be at least 8 characters long']
  }
});

module.exports = mongoose.model('User', userSchema);
