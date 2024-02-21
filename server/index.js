const express = require("express");
const cors = require("cors");
const app = express();
// const { app, server } = require("./socket/socket.js");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000
app.options('', cors(
    {
        origin: '*',
        // origin: ['https://mern-lava-client.vercel.app'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(cors(
    {
        origin: '*',
        // origin: ['https://mern-lava-client.vercel.app'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    }
));

// httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer({
//     target: 'https://mern-lava-client.vercel.app',
//     ws: true, // Enable WebSocket support
// });
// const __dirname = path.resolve();
// __dirname = path.resolve();

dotenv.config();

// app.use(express.static(path.resolve(__dirname, 'client', 'build')));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
//         if (err) {
//             res.status(500).send(err)
//         }
//     });
// })
app.use(cookieParser());
app.use(express.json());
// let corsOptions = {
//     origin: ["http://localhost:5000", "https://mern-lava-server.vercel.app"],
// methods: ['POST', 'GET', 'PUT', 'DELETE'],
// credentials: true
// };
// app.use(cors(corsOptions));
app.use(cors())

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
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

// Define routes and middleware
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
// server.listen(PORT, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${PORT}`);
// });