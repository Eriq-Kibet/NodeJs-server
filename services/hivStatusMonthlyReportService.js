"use strict";

const connection = require("../connection/connection");

const serviceDef = { getHivStatusMonthlyReport };
function getHivStatusMonthlyReport(status, year_month) {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        `SELECT p.name as Patient_name, date_format(e.encounter_datetime,"%Y-%m-%d")
        as Encounter_Date, l.name  as Location, e.hiv_status, p.gender, p.age
          FROM encounters e
          JOIN locations l ON e.encounter_id = l.id
      JOIN patients p ON p.patientId = encounter_id
           WHERE e.hiv_status = "${status}" 
           AND date_format(e.encounter_datetime,"%Y-%m") = "${year_month}"`,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}

module.exports = serviceDef;
