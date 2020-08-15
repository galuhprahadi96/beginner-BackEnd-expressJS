require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
// ===================================
const routerNavigation = require("./src");
// ===================================

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  next();
});

// ===================================
app.use("/", routerNavigation);
// ===================================

app.get("*", (request, response) => {
  response.status(404).send("Path Not Found !");
});

app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
  console.log(
    `Express app is listening on host: ${process.env.IP_ADDRESS} and port: ${process.env.PORT}`
  );
});
