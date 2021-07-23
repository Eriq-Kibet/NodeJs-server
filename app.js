"use strict";

const Hapi = require("@hapi/hapi");
const locationService = require("./services/locationService");

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
        return locationService.getPatients();
      },
    },
    // Gets all encounters form DB
    {
      method: "GET",
      path: "/api/encounters",
      handler: (request, h) => {
        return locationService.getEncounters();
      },
    },
    // Gets all locations form DB

    {
      method: "GET",
      path: "/api/locations",
      handler: (request, h) => {
        return locationService.getLocations();
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
