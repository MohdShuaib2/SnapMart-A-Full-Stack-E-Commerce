const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopnest";

    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error("Mongo connection failed:", error.message);
        console.error("Check your MONGO_URI or MONGO_URL in backend/.env");
        process.exit(1);
    }
};

module.exports = connectDB;