const express = require("express");
const cors = require("cors");
const app = express();
// const { app, server } = require('./socket/socket.js');
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000
// app.options('', cors(
//     {
//         origin: '*',
//         // origin: ['https://mern-lava-server.vercel.app'],
//         methods: ['POST', 'GET', 'PUT', 'DELETE'],
//         credentials: true
//     }
// ));
// app.use(cors(
//     {
//         origin: ['https://mern-lava-server.vercel.app'],
//         methods: ['POST', 'GET', 'PUT', 'DELETE'],
//         credentials: true
//     }
// ));

// httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer({
//     target: 'https://mern-lava-client.vercel.app',
//     ws: true, // Enable WebSocket support
// });


// const __dirname = path.resolve();
// __dirname = path.resolve();

dotenv.config();

// app.use(express.static(path.resolve(__dirname, '/client/dist')));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'), function (err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     });
// })

const authRoutes = require("./routes/auth.routes");
const bookingRoutes = require("./routes/booking.routes");
const productsRoutes = require("./routes/products.routes");
const storeRoutes = require("./routes/store.routes");
const chatRoutes = require("./routes/chat.routes");
const testimonialRoutes = require('./routes/testimonial.routes')
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "25mb" }));
// let corsOptions = {
//     origin: ["http://localhost:5000", "https://mern-lava-server.vercel.app"],
// methods: ['POST', 'GET', 'PUT', 'DELETE'],
// credentials: true
// };
// app.use(cors(corsOptions));
// app.use(cors())
app.use(cors(
    {
        origin: ["https://mern-lava-client.vercel.app", "localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/testimonial", testimonialRoutes);
// Connect to MongoDB
const connectToMongoDB = require("./db/ConnectToMongoDB.js");
// const db = connectToMongoDB.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
app.get("/", async (req, res) => {
    res.send("server running")
});
const Attendance = require('./models/test.model.js'); // Adjust the path as per your project structure
const { default: mongoose } = require("mongoose");



app.get('/getattendance', async (req, res) => {

    const db = mongoose.connection.db;
    const subjectsCollection = db.collection('attendances');
    const attendanceStud = await subjectsCollection.find().toArray();
    res.json(attendanceStud);

});

// Define routes and middleware
const server = app.listen(PORT, () => {
    connectToMongoDB();
    server.timeout = 30000;
    console.log(`Server running on port ${PORT}`);
});
// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${PORT}`);
// });
// import { Analytics } from "@vercel/analytics/react"