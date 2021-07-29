const connection = require("../connection/connection");

//Query Patient Details
const patientSearchDef = { patientDetails };

function patientDetails(patientName) {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        `SELECT patients.name, patients.gender, date_format(patients.dob,"%Y-%m-%d") AS Birth_Date, patients.age, patients.phone_number, encounters.hiv_status
        FROM patients
       LEFT JOIN encounters ON patients.patientID = encounters.encounter_id
        WHERE name LIKE "%${patientName}%"`,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}
module.exports = patientSearchDef;
