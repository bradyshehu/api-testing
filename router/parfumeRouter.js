const express = require("express");

const router = express.Router();
const { index } = require("../controller/parfumesController");

// INDEX TEST

router.get("/", index);

module.exports = router;
