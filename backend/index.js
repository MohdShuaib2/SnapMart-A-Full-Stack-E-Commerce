const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/authRoutes.js")
const dns = require("dns");

dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("SnapMart is working Properly!");
});

const PORT = process.env.PORT || 5000;

app.use('/api/auth', userRoutes);
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});