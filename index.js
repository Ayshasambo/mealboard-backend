const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { application } = require('express');
require('dotenv/config');
const cors = require("cors");

//connect to database
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//routes
const mealcategoryRoute = require('./routes/mealcategory');

//middlewares
app.use(cors());
app.use(express.json());
app.use('/api/mealcategory', mealcategoryRoute)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));