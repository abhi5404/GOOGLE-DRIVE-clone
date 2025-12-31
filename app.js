const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
connectDB();
const userRoutes = require('./routes/user.routes');
dotenv.config();
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

