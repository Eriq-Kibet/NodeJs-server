"use strict";
const connection = require("../connection/connection");

const def = {
  getLocations,
  getEncounters,
  getPatients,
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
// Query Encounters
function getEncounters() {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query("SELECT * FROM encounters", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}
//Query Patients
function getPatients() {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query("SELECT * FROM patients", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}
module.exports = def;
