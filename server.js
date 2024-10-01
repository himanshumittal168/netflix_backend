require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const favoritesRoute = require("./routes/favoritesRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute)
app.use("/api/favorites", favoritesRoute);

mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    })
})