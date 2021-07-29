const connection = require("../connection/connection");

// Hiv Monthly Report
const hivMonthlyReportDef = { getHivMonthlyReport };

function getHivMonthlyReport(selectedMonth) {
  return new Promise((resolve, reject) => {
    connection.dbConnection().then((pool) => {
      pool.query(
        `SELECT 
        DATE_FORMAT(e.encounter_datetime, '%Y-%m') AS Month,
        l.name AS Location,
        COUNT(DISTINCT CASE
                WHEN hiv_status = 'Positive' THEN hiv_status
            END) AS Positive,
        COUNT(DISTINCT CASE
                WHEN hiv_status = 'Negative' THEN hiv_status
            END) AS Negative,
        COUNT(DISTINCT CASE
                WHEN hiv_status = 'Unknown' THEN hiv_status
            END) AS Unknown_Status
    FROM
        encounters e
            JOIN
        locations l ON e.encounter_id = l.id
    WHERE
        DATE_FORMAT(e.encounter_datetime, '%Y-%m') LIKE '${selectedMonth}'
    GROUP BY Location , Month`,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  });
}
module.exports = hivMonthlyReportDef;
