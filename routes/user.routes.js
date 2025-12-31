const express = require('express');
const router = express.Router();


router.get('/register', (req, res) => {
    res.render('register'); 
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.send('User registered successfully');
}); 

module.exports = router;