"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dbSetup_1 = require("./dbSetup");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
const todoController_1 = __importDefault(
  require("./controllers/todoController")
);
const port = 80;
const app = (0, express_1.default)();
// =========== MIDDLEWARE ===========
// - middleware intercepts all the http calls made to and from the server
app.use((0, morgan_1.default)("dev")); // middleware for logging http requests https://www.npmjs.com/package/morgan
app.use(express_1.default.urlencoded({ extended: true })); // middleware for parsing urlencoded data https://www.npmjs.com/package/body-parser
app.use(express_1.default.json()); // middleware for parsing json data https://www.npmjs.com/package/body-parser
// app.use(helmet()); // middleware for that takes care of some common security configuration https://www.npmjs.com/package/helmet
// Have to configure Cross Origin Resource Sharing since we are making a request from a different port
// Says, allow the app to accept requests from...
const corsOption = { origin: "http://localhost:5173" };
app.use((0, cors_1.default)(corsOption)); // middleware for handling cross-origin resource sharing https://www.npmjs.com/package/cors
// Wiring in the controller routes
app.use("/api", todoController_1.default);
// ------- Other possible common middleware --------
// Could go either way on this implementation, but this allows us to serve the built React app from the Node.js API server
// This is an implementation of a monolithic application, comment this out if we want to run microservices
if (process.env.MONOLITH === "true") {
  app.use(
    express_1.default.static(path_1.default.join(__dirname, "static/dist"))
  ); // middleware for serving static files https://www.npmjs.com/package/express-static
}
// app.use(compression()); // middleware for compressing data https://www.npmjs.com/package/compression
// app.use(cookieParser()); // middleware for parsing cookies https://www.npmjs.com/package/cookie-parser
// app.use(session({secret: 'XXXXXXXXX', resave: true, saveUninitialized: true}
// =========== MIDDLEWARE ===========
// Starting the app
(0, dbSetup_1.connectToDB)()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on  http://localhost:${port}...`);
    });
  })
  .catch((error) => console.log(error));
