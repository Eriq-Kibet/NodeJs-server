const connection = require("../connection/connection");
// Query Encounters
const encountersDef = {
  getEncounters,
};
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
module.exports = encountersDef;
