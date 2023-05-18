// Configuring environment variables
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import * as mongoose from "mongoose";

// Mongod db documentation: https://mongoosejs.com/docs/connections.html
const uri = `mongodb://${process.env.MONDDB_URI}:${process.env.MONGODB_PORT}`;
const options: mongoose.ConnectOptions = {
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
  authSource: process.env.MONGODB_AUTHSOURCE,
  dbName: process.env.MONGODB_DB,
};

const connectToDB = async (): Promise<void> => {
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
const todoSchema: mongoose.Schema = new mongoose.Schema({
  id: Number,
  text: String,
  completed: Boolean,
});

// Define todo model
const dbConnection: mongoose.Model<any> = mongoose.model(
  process.env.MONGODB_TABLE!,
  todoSchema
);

/**
 * Drop the database if it exists
 * @return {Promise<void>}
 */
async function dropDBIfExists(): Promise<void> {
  try {
    await dbConnection.db
      .dropCollection(process.env.MONGODB_TABLE!)
      .then(() => {
        console.log("Collection dropped");
      });
  } catch (err) {
    console.log("No db found:");
  }
}

// Seed the database on startup
const seedDb = async (): Promise<void> => {
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

export { seedDb, connectToDB, dbConnection };
