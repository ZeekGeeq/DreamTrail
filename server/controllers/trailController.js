const Trail = require("../models/trailModel")
const mongoose = require('mongoose')

const getTrails = async (req,res) => {
    const trails = await Trail.find({}).sort({createdAt: -1})

    res.status(200).json(trails)
}


const getTrail = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such workout or invalid object id'})
    }

    const trail = await Trail.findById(id)

    if(!trail){
        return res.status(404).json({error: 'No such trail exists'})
    }

    res.status(200).json(trail)
}


const createTrail = async(req,res) => {
    const {date, duration, quality} = req.body
    //add the doc to the database
    try{
        const trail = await Trail.create({date, duration, quality})
        res.status(200).json(trail)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a Trail
const deleteTrail = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such trail'})
    }

    const trail = await Trail.findByIdAndDelete({_id: id})

    if(!trail){
        return res.status(400).json({error: 'no such trail'
        })
    }

    res.status(200).json(trail)
}

const updateTrail = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such trail'})
    }

    const trail = await Trail.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!trail){
        return res.status(400).json({error: 'no such trail'})
    }
    res.status(200).json(trail)
}

module.exports= {
    getTrails,
    getTrail,
    createTrail,
    deleteTrail,
    updateTrail
}