const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(cors())

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose')
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 11,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    photoimage: {
        type: String,
    }

});

const User = mongoose.model('user', UserSchema)
app.get("/", async (req, res) => {
    const allUser = await User.find({});
    try {
        res.send(allUser);
    } catch (error) {
        console.log(error);
    }
});

// Define routes and middleware
app.listen(PORT, () => {
    connectToMongoDB();
    // server.timeout = 30000;
    console.log(`Server running on port ${PORT}`);
});
// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${PORT}`);
// });
// import { Analytics } from "@vercel/analytics/react"