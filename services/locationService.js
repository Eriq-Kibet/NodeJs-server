"use strict";
const connection = require("../connection/connection");

const locationDef = {
  getLocations,
};
//Query Locations
function getLocations() {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query("SELECT * FROM locations", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

module.exports = locationDef;
