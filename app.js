const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const indexRoutes = require('./routes/index.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

app.set('view engine', 'ejs');
app.use(cookieParser());

// Serve static files from /public and uploaded files from /uploads
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

