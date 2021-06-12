const mongoose = require('mongoose');
require('dotenv').config();
const testConnection = process.env.DB_TEST_STRING;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

const setupTestDB = () => {
  console.log(testConnection)
  beforeAll(async () => {
    await mongoose.connect(testConnection, options)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to db", err));
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
