const express = require("express");

const router = express.Router();
const {
  index,
  indexBestSellers,
  indexRecent,
  show,
} = require("../controller/parfumesController");

// INDEX TEST

router.get("/", index);
router.get("/bestsellers", indexBestSellers);
router.get("/recents", indexRecent);
router.get("/:id", show);

module.exports = router;
