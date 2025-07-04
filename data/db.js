const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "filler_parfume",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connessione al Database riuscita");
});

module.exports = connection;
