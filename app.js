"use strict";

const Hapi = require("@hapi/hapi");
const locationService = require("./services/locationService");
const encounterService = require("./services/encounterService");
const patientService = require("./services/patientService");
const hivStatusReport = require("./services/hivStatusMonthlyReportService");
const patientSearchService = require("./services/patientSearchService");
const encounterMonthService = require('./services/encounterMonthService');

const init = async () => {
  const server = Hapi.server({
    port: 5100,
    host: "localhost",
  });
  // Routes to /api
  server.route([
    {
      method: "GET",
      path: "/api/",
      handler: (request, h) => {
        return "<h1>WELCOME</h1>";
      },
    },
    {
      // Request all patients form DB
      method: "GET",
      path: "/api/patients/",
      handler: (request, h) => {
        return patientService.getPatients();
      },
    },
    // Gets all encounters form DB
    {
      method: "GET",
      path: "/api/encounters",
      handler: (request, h) => {
        return encounterService.getEncounters();
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
    // Get HIV status Monthly Report
    {
      method: "GET",
      path: "/api/hiv-status-report",
      handler: (request, h) => {
        const month = request.query.month;
        console.log(month);
        return hivStatusReport.getHivStatusMonthlyReport(month);
      },
    },
    // Search patient by name
    {
      method: "GET",
      path: "/api/patients",
      handler: (request, h) => {
        const patientName = request.query.name;
        console.log("Patient name", patientName);
        return patientSearchService.searchPatients(patientName);
      },
    },
      // Get Encounter Months
      {
        method: "GET",
        path: "/api/months",
        handler: (request, h) => {
          return encounterMonthService.getEncounterMonth()
        },
      },
  ]);
  //Starting the server

  await server.start();
  console.log("server running on", server.info.uri + "/api/");
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
