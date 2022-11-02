const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoURI = process.env.DATABASE;

// const mongoURI = 'mongodb+srv://bvs:BVS1807@cluster0.nomf33n.mongodb.net/chaiwala-demo?retryWrites=true&w=majority';
// const mongoURI = 'mongodb://localhost:27017/chaiwala'
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected with Mongo Successfully!");
    })
}

module.exports = connectToMongo;

// NEW Connection string 
// mongodb+srv://bhaveshkumar:<password>@cluster0.6wm0xmz.mongodb.net/?retryWrites=true&w=majority