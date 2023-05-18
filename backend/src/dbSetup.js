"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.connectToDB = exports.seedDb = void 0;
// Configuring environment variables
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path.resolve(__dirname, ".env") });
const mongoose = __importStar(require("mongoose"));
// Mongod db documentation: https://mongoosejs.com/docs/connections.html
const uri = "mongodb://localhost:27017";
const options = {
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  authSource: process.env.MONGODB_AUTHSOURCE,
  dbName: process.env.MONGODB_DB,
};
const connectToDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose.connect(uri, options).then(() => {
      console.log("Connected to MongoDB");
      if (process.env.SEED_DB === "true") {
        seedDb();
      } else {
        console.log("DB not seeded");
      }
    });
  });
exports.connectToDB = connectToDB;
// Define todo schema
const todoSchema = new mongoose.Schema({
  id: Number,
  text: String,
  completed: Boolean,
});
// Define todo model
const dbConnection = mongoose.model(process.env.MONGODB_TABLE, todoSchema);
exports.dbConnection = dbConnection;
/**
 * Drop the database if it exists
 * @return {Promise<void>}
 */
function dropDBIfExists() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield dbConnection.db
        .dropCollection(process.env.MONGODB_TABLE)
        .then(() => {
          console.log("Collection dropped");
        });
    } catch (err) {
      console.log("No db found:");
    }
  });
}
// Seed the database on startup
const seedDb = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield dropDBIfExists();
    yield dbConnection
      .insertMany([
        {
          id: 1,
          text: "Learn Node.js",
          completed: true,
        },
        {
          id: 2,
          text: "Learn Express.js",
          completed: false,
        },
        {
          id: 3,
          text: "Learn MongoDB",
          completed: false,
        },
        {
          id: 4,
          text: "Learn GraphQL",
          completed: false,
        },
        {
          id: 5,
          text: "Learn Apollo",
          completed: false,
        },
        {
          id: 6,
          text: "Learn Apollo Server",
          completed: false,
        },
        {
          id: 7,
          text: "Learn React.js",
          completed: false,
        },
        {
          id: 8,
          text: "Learn Redux",
          completed: false,
        },
        {
          id: 9,
          text: "Learn React Native",
          completed: false,
        },
        {
          id: 10,
          text: "Learn Redux-Thunk",
          completed: false,
        },
      ])
      .then(() => console.log("DB Seeded"));
  });
exports.seedDb = seedDb;
