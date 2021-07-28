"use strict";

const connection = require("../connection/connection");

const serviceDef = { getHivStatusMonthlyReport };
function getHivStatusMonthlyReport(month) {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        'SELECT name,id,date_format(date_created,"%Y-%m-%d") as date_created FROM locations',
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}

module.exports = serviceDef;
