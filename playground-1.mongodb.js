/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'local';
const collection = 'todos';

// // The current database to use.
use(database);

// // Create a new collection.
db.createCollection(collection);

// The current database to use.
use('local');

// Create a new document in the collection.
db.getCollection(collection).insertMany([


  {
    text: 'TODO 1', completed: true,
  },
  {
    text: 'TODO 2', completed: false,
  },
  {
    text: 'TODO 3', completed: true,
  },
  {
    text: 'TODO 4', completed: false,
  },
],
);

db.getCollection(collection).find({});

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
