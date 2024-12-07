//File is responsible for creating and launching routes:
//These are the requests that the backend makes to the
//database to send, change, and receive data.
const express = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const {
  getTrails,
  getTrail,
  createTrail,
  updateTrail,
  deleteTrail,
} = require("../controllers/trailController");

const router = express.Router();

//get all dreamtrails
router.get("/", ensureAuthenticated, getTrails);

//get specific trail
router.get("/:id", ensureAuthenticated, getTrail);

router.delete("/:id", ensureAuthenticated, deleteTrail);

router.post("/", ensureAuthenticated, createTrail);

router.patch("/:id", ensureAuthenticated, updateTrail);
module.exports = router;
