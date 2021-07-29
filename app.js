"use strict";

const Hapi = require("@hapi/hapi");
const locationService = require("./services/locationService");
const encounterService = require("./services/encounterService");
const searchPatientService = require("./services/searchPatientService");
const hivStatusReport = require("./services/hivStatusMonthlyReportService");
const patientDetailsService = require("./services/patientDetailsService");
const encounterMonthService = require("./services/encounterMonthService");
const hivMonthlyReportService = require("./services/hivMonthlyReportService");

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
      path: "/api/patients",
      handler: (request, h) => {
        const patientName = request.query.name;
        console.log("Patient name", patientName);
        return searchPatientService.searchPatient(patientName)
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
    // Get patient Details
    {
      method: "GET",
      path: "/api/patients-details",
      handler: (request, h) => {
        const patientInfo = request.query.name;
        console.log("Patient name", patientInfo);
        return patientDetailsService.patientDetails(patientInfo);
      },
    },
    // Get Encounter Months
    {
      method: "GET",
      path: "/api/months",
      handler: (request, h) => {
        return encounterMonthService.getEncounterMonth();
      },
    },
    // Monthly Report
    {
      method: "GET",
      path: "/api/monthly-report",
      handler: (request, h) => {
        const selectedMonth = request.query.encounter_datetime;
        console.log("Selected Month", selectedMonth);
        return hivMonthlyReportService.getHivMonthlyReport(selectedMonth);
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
