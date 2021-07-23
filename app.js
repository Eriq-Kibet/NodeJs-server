"use strict";

const Hapi = require("@hapi/hapi");
const Mysql = require("mysql");

const dbConnection = Mysql.createConnection({
  host: "134.209.246.16",
  user: "testuser",
  password: "123456789",
  database: "testDatabase",
});
// Connects to DB
dbConnection.connect((error) => {
  if (error) {
    console.log("DB connection not");
    throw error;
  }
  console.log("connected to DB");
});
const init = async () => {
  const server = Hapi.server({
    port: 5100,
    host: "localhost",
  });
  // Routes to /api
  server.route([
    {
      method: "GET",
      path: "/api",
      handler: (request, h) => {
        return "<h1>WELCOME</h1>";
      },
    },
    {
      // Request all patients form DB
      method: "GET",
      path: "/api/patients",
      handler: (request, h) => {
        dbConnection.query(
          "SELECT * FROM patients",
          (error, results, fields) => {
            if (error) throw error;
            console.log("Patients :", results);
            return h.response(results);
          }
        );
      },
    },
    // Gets all encounters form DB
    {
      method: "GET",
      path: "/api/encounters",
      handler: (request, h) => {
        dbConnection.query(
          "SELECT * FROM encounters",
          (error, results, fields) => {
            if (error) throw error;
            console.log("Encounters :", results);
            return h.response(results);
          }
        );
      },
    },
    // Gets all locations form DB

    {
      method: "GET",
      path: "/api/locations",
      handler: (request, h) => {
        dbConnection.query(
          "SELECT * FROM locations",
          (error, results, fields) => {
            if (error) throw error;
            console.log("Locations :", results);
            return results;
          }
        );
        return h.results;
      },
    },
    // Handles Incorrect input in the browser
    {
      method: "GET",
      path: "/{any*}",
      handler: (request, h) => {
        return "<h2>Page not found</h2>";
      },
    },
  ]);
  //Starting the server

  await server.start();
  console.log("server running on", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
