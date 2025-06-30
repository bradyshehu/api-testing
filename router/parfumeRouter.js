const express = require("express");

const router = express.Router();
const { index, indexTest } = require("../controller/parfumesController");

// INDEX TEST

router.get("/test", indexTest);

module.exports = router;
