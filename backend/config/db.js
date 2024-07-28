const mongoose =require('mongoose');
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB');
});

db.on('error',()=>{
    console.log('Error connecting to MongoDB');
});