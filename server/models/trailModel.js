//Schema is implemented to create a defined structre for all data
//that is being sent to the database
//to keep consistency, make sure that all
//schemas are JSON or structured similar 
//to the example

const mongoose = require('mongoose')

const Schema = mongoose.Schema

//may reconsider restructuring this
//in need of a system to log time
//Ideally, users should be able to log their sleep
//by either starting and ending their sleep
//or by logging it all at once.
//As a feature of accountability, users should
//only be allowed to log sleep at a specified
//time that they cannot change.
//There are obvious isntance in which a user
//should be able to change their log time
//but it should not be able to be easily abused

const trailSchema = new Schema({
    date:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    quality: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Trail',trailSchema)
