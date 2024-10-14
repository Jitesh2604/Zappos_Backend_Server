require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("DB connected successfully!")
    } catch (err) {
        console.log("DB connection failed!", err.message);
    }
}

module.exports = connectDB;