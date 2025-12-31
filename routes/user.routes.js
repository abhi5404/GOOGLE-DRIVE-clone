const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { username, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      age,
      email,
    password: hashedPassword
    });

    res.json({
      message: 'User registered successfully',
      user
    });
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login',
   body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation failed'
            });
        }
        const { username, password } = req.body;
        const user= await userModel.findOne({
            username: username
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid username or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid username or password'
            });
        }
    }); 
module.exports = router;
