//File is responsible for creating and launching routes:
//These are the requests that the backend makes to the
//database to send, change, and receive data.
const express = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated.js");
const {
  getGoals,
  getGoal,
  deleteGoal,
  createGoal,
} = require("../controllers/goalController");

const router = express.Router();

//get all dreamtrails
router.get("/", ensureAuthenticated, getGoals);

//get specific trail
router.get("/:id", ensureAuthenticated, getGoal);

router.delete("/:id", ensureAuthenticated, deleteGoal);

router.post("/", ensureAuthenticated, createGoal);

//router.patch('/:id', updateGoal)
module.exports = router;
