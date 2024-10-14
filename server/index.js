require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
const cartRoute = require("./routes/cart.routes");
const categoriesRoute = require("./routes/category.routes");
const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  }));

app.use("/", (req, res) => {
    res.send("connected!")
});

app.use("/api/user", userRoute);

app.use("/api/product", productRoute);

app.use("/api/user/cart", cartRoute);

app.use("/api/categories", categoriesRoute);

const PORT = process.env.PORT;
app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`server is running on port ${PORT}`);
    } catch (err) {
        console.log("server connection failed");
    }
    
}) 
