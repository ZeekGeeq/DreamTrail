const Goal = require("../models/goalModel");
const mongoose = require("mongoose");

const getGoals = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Logged out or unauthorized, log back in." });
  }

  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ hours: -1 });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(400).json({ error: error.message });
  }
};

const getGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such goal or invalid object id" });
  }

  const goal = await Goal.findById(id);

  if (!goal) {
    return res.status(404).json({ error: "No such goal exists" });
  }

  res.status(200).json(goal);
};

const createGoal = async (req, res) => {
  const { hours, minutes, frequency } = req.body;
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Logged out or unauthorized, log back in." });
  }
  //add the doc to the database
  try {
    // Create a new goal and associate it with the logged-in user
    const goal = await Goal.create({
      userId: req.user._id,
      hours,
      minutes,
      frequency,
    });
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "no such goal" });
  }

  const goal = await Goal.findByIdAndDelete({ _id: id });

  if (!goal) {
    return res.status(400).json({ error: "no such goal" });
  }

  res.status(200).json(goal);
};

//const updateGoal = async (req,res) => {
//    const { id } = req.params
//
//    if(!mongoose.Types.ObjectId.isValid(id)) {
//        return res.status(404).json({error: 'no such goal'})
//    }
//
//    const goal = await Goal.findByIdAndUpdate({_id: id},{
//        ...req.body
//    })
//
//    if(!goal){
//        return res.status(400).json({error: 'no such goal'})
//    }
//    res.status(200).json(goal)
//}

module.exports = {
  getGoals,
  getGoal,
  deleteGoal,
  createGoal,
};
