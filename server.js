// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/*EndPoint to save & get Data.*/
// Here we save data come from client side by POST Method and save it in projectData variable.
app.post("/saveData", function (req, res) {
  // We need to make projectData as a new object and contains all data in request.
  projectData = { ...req.body };
  // we didn't send data here because we need to send data with a get route.
  res.send();
});

// Here a get route to send data to client side when need it.
app.get("/getData", function (req, res) {
  res.send(projectData);
});

// Setup Server
app.listen(port, function () {
  console.log(`The server is running on port ${port}`);
});
