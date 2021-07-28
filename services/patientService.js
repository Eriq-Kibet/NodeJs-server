const connection = require("../connection/connection");

//Query Patients
const patientsDef = { getPatients };

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
module.exports = patientsDef;
