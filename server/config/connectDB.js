const mongoose = require("mongoose");
require("dotenv").config();

if(!process.env.MONGODB_URI){
    throw new Error(" Please provide MongoDB URI in the .env File.")
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;