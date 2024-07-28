const express = require('express');
const cors =require('cors');
require('dotenv').config();
require('./config/db');
const port = process.env.PORT;
const UserController = require('./controller/userController');
const RecipieController = require('./controller/recipieController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',UserController);
app.use('/api/recepie',RecipieController);


app.listen(port,()=>{
    console.log(`>>Server is running on port ${port}`);
})