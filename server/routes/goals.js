//File is responsible for creating and launching routes:
//These are the requests that the backend makes to the
//database to send, change, and receive data.
const express = require('express')
const {
    getGoals,
    getGoal,
    deleteGoal,
    createGoal
}= require('../controllers/trailController')

const router = express.Router()

//get all dreamtrails
router.get('/',getGoals)

//get specific trail
router.get('/:id', getGoal)

router.delete('/:id',deleteGoal)

router.post('/', createGoal)

//router.patch('/:id', updateGoal)
module.exports = router