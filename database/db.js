const { Pool } = require("pg");
// Local Database
const localDB = {
  user: "postgres",
  host: "localhost",
  database: "awni",
  password: "asdf1234",
  port: 5432,
};

// Aws database
const awsDB = {
  user: "awni",
  host: "awni-database-instance.cf2qpmbf36be.us-west-2.rds.amazonaws.com",
  database: "awni",
  password: "asdf1234",
  port: 5432,
};

const pool = new Pool(awsDB);
pool.connect((err, client) => {
  if (err) {
    console.log("Oops error occured while connecting the database", error);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = pool;
