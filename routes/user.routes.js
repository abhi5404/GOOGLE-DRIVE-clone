const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.get('/register', (req, res) => {
    res.render('register'); 
});

router.post('/register', 
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),   
    
    (req, res) => {

    const errors = validationResult(req);
    console.log(errors);
    
    res.send(errors)
}); 

module.exports = router;