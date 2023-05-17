import express, { Express } from "express";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { connectToDB } from "./dbSetup";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env") });

import todoController from "./controllers/todoController";

const port = 80;
const app: Express = express();

// =========== MIDDLEWARE ===========

// - middleware intercepts all the http calls made to and from the server
app.use(morgan("dev")); // middleware for logging http requests https://www.npmjs.com/package/morgan
app.use(express.urlencoded({ extended: true })); // middleware for parsing urlencoded data https://www.npmjs.com/package/body-parser
app.use(express.json()); // middleware for parsing json data https://www.npmjs.com/package/body-parser

// app.use(helmet()); // middleware for that takes care of some common security configuration https://www.npmjs.com/package/helmet

// Have to configure Cross Origin Resource Sharing since we are making a request from a different port
// Says, allow the app to accept requests from...
const corsOption = { origin: "http://localhost:5173" };
app.use(cors(corsOption)); // middleware for handling cross-origin resource sharing https://www.npmjs.com/package/cors

// Wiring in the controller routes
app.use("/api", todoController);

// ------- Other possible common middleware --------

// Could go either way on this implementation, but this allows us to serve the built React app from the Node.js API server
// This is an implementation of a monolithic application, comment this out if we want to run microservices

if (process.env.MONOLITH === "true") {
    app.use(express.static(path.join(__dirname, "static/dist"))); // middleware for serving static files https://www.npmjs.com/package/express-static
}

// app.use(compression()); // middleware for compressing data https://www.npmjs.com/package/compression
// app.use(cookieParser()); // middleware for parsing cookies https://www.npmjs.com/package/cookie-parser
// app.use(session({secret: 'XXXXXXXXX', resave: true, saveUninitialized: true}

// =========== MIDDLEWARE ===========

// Starting the app
connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on  http://localhost:${port}...`);
        });
    })
    .catch((error) => console.log(error));
