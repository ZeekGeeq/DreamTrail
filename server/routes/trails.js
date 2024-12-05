//File is responsible for creating and launching routes:
//These are the requests that the backend makes to the
//database to send, change, and receive data.
const express = require('express')
const {
    getTrails,
    getTrail,
    createTrail,
    updateTrail,
    deleteTrail
}= require('../controllers/trailController')

const router = express.Router()

//get all dreamtrails
router.get('/',getTrails)

//get specific trail
router.get('/:id', getTrail)

router.delete('/:id',deleteTrail)

router.post('/', createTrail)

router.patch('/:id', updateTrail)
module.exports = router