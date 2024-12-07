const Trail = require("../models/trailModel");
const mongoose = require("mongoose");

const getTrails = async (req, res) => {
  try {
    const trails = await Trail.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trails" });
  }
};

const getTrail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "no such workout or invalid object id" });
  }

  const trail = await Trail.findById(id);

  if (!trail) {
    return res.status(404).json({ error: "No such trail exists" });
  }

  res.status(200).json(trail);
};

const createTrail = async (req, res) => {
  const { date, duration, quality } = req.body;
  //add new to db
  try {
    const trail = new Trail({
      date,
      duration,
      quality,
      userId: req.user._id,
    });

    await trail.save();
    res.status(201).json(trail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a Trail
const deleteTrail = async (req, res) => {
  try {
    const trail = await Trail.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!trail) {
      return res.status(404).json({ error: "Trail not found" });
    }

    res.status(200).json(trail);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete trail" });
  }
};

const updateTrail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such trail" });
  }

  const trail = await Trail.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  );

  if (!trail) {
    return res.status(400).json({ error: "no such trail" });
  }
  res.status(200).json(trail);
};

module.exports = {
  getTrails,
  getTrail,
  createTrail,
  deleteTrail,
  updateTrail,
};
