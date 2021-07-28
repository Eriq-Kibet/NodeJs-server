const connection = require("../connection/connection");

// Get the months for encounters
const encounterMonthDef = { getEncounterMonth };

function getEncounterMonth() {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        `SELECT monthname(encounter_datetime) as Month FROM encounters WHERE encounter_datetime`,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}
module.exports = encounterMonthDef;
