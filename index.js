const express = require("express");
const cors = require("cors");
require("dotenv").config();
const parfumeRouter = require("./router/parfumeRouter");

const APP_PORT = process.env.APP_PORT;
const APP_URL = process.env.APP_URL;
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use("/parfumes", parfumeRouter);

app.listen(APP_PORT, () =>
  console.log("Server in ascolto su: " + APP_URL + ":" + APP_PORT)
);
