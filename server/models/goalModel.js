const mongoose = require('mongoose')
const Schema = mongoose.Schema
const goalSchema = new Schema({
    hours:{
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Goals',goalSchema)