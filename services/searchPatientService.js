const connection = require("../connection/connection");

//Query  Patient by name
const searchPatientDef = { searchPatient };

function searchPatient(patientName) {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        `SELECT * FROM patients WHERE name LIKE "%${patientName}%"`,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}
module.exports = searchPatientDef;
