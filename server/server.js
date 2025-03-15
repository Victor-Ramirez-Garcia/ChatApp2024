// Import "express" module from node_modules
const express = require("express");
// Import "http" module from node_modules
const http = require('http');
// Import "cors" module from node_modules
const cors = require("cors");
// Import "cookie-parser" from node_modules
const cookieParser = require("cookie-parser");

const app = express(); // Create Express.js application
const server = http.createServer(app); // Create new server
const port = 8000; // Port number of the server

// Loads .env contents into process.env environment variables,
// where you can access to .env variables by doing process.env.___
require('dotenv').config();

// Reads any cookies associated with the client's request to the server,
// parses the cookie data, and attaches it to req.cookies object to be
// made available.
app.use(cookieParser());

// Allows the server to accept and include credentials in cross-origin
// requests coming only from "http://localhost:3000".
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// Parses incoming requests with JSON payloads (client requests)
// Processes incoming requests with JSON payloads, and is made
// available in the req.body object.
app.use(express.json());

// Processes incoming requests with urlencoded payloads by allowing
// objects and arrays to be encoded into the URL-encoded format,
// and is made available in the req.body object.
app.use(express.urlencoded({extended: true}));

// Import mongoose configuration
require('./config/mongoose.config')

// Import routes modules that defines routes related
// to the given operations
const userapp = require('./routes/user.routes');
const chatapp = require('./routes/chat.routes');
const chatSocketApp = require('./sockets/chat.socket');
// Allows the route module to register its routes in the 
// Express.js application
userapp(app);
chatapp(app);
chatSocketApp(server);

// Listens for connections on the port, and send a message to the terminal
server.listen(port, () => (console.log(`Listening on port ${port}`)));