const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

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

    const user = await User.create({
      username,
      age,
      email,
      password
    });

    res.json({
      message: 'User registered successfully',
      user
    });
  }
);

module.exports = router;
