// Configuring environment variables
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");

// Mongod db documentation: https://mongoosejs.com/docs/connections.html
const uri = "mongodb://localhost:27017";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  authSource: process.env.MONGODB_AUTHSOURCE,
  dbName: process.env.MONGODB_DB,
};
const connectToDB = async () => {
  await mongoose.connect(uri, options).then(() => {
    console.log("Connected to MongoDB");
    if (process.env.SEED_DB === "true") {
      seedDb();
    } else {
      console.log("DB not seeded");
    }
  });
};

// Define todo schema
const todoSchema = new mongoose.Schema({
  id: Number,
  text: String,

  completed: Boolean,
});

// Define todo model
const dbConnection = mongoose.model(process.env.MONGODB_TABLE, todoSchema);

/**
 * Drop the database if it exists
 * @return {Promise<void>}
 */
async function dropDBIfExists() {
  try {
    await dbConnection.db.dropCollection(process.env.MONGODB_TABLE).then(() => {
      console.log("Collection dropped");
    });
  } catch (err) {
    console.log("nod db found:");
  }
}

// Seed the database on startup
const seedDb = async () => {
  await dropDBIfExists();
  await dbConnection
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
};

module.exports = { seedDb, connectToDB, dbConnection };
