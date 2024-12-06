const Goal = require("../models/goalModel")
const mongoose = require('mongoose')

const getGoals = async (req,res) => {
    const goals = await Goal.find({}).sort({hours: -1})

    res.status(200).json(goals)
}


const getGoal = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such goal or invalid object id'})
    }

    const goal = await Goal.findById(id)

    if(!goal){
        return res.status(404).json({error: 'No such goal exists'})
    }

    res.status(200).json(goal)
}


const createGoal = async(req,res) => {
    const {hours, minutes, frequency} = req.body
    //add the doc to the database
    try{
        const goal = await Goal.create({hours, minutes, frequency})
        res.status(200).json(goal)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteGoal = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such goal'})
    }

    const goal = await Goal.findByIdAndDelete({_id: id})

    if(!goal){
        return res.status(400).json({error: 'no such goal'})
    }

    res.status(200).json(goal)
}

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

module.exports= {
    getGoals,
    getGoal,
    deleteGoal,
    createGoal
}