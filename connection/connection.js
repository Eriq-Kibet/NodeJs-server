"use strict";

const config = require("../config/config.json");

const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: config.mysql.connectionLimit,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

const serviceDef = {
  dbConnection: dbConnection,
};

// Connect to Data Base
function dbConnection() {
  return new Promise((resolve, reject) => {
    resolve(pool);
  });
}
module.exports = serviceDef;
