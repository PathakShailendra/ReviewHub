import mongoose from "mongoose";
import config from './config.js'

function connectDB() {
    mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message || error);
    });

}

export default connectDB;