const express = require('express')
const router = express.Router()
const Controller = require("./organism")

// Create
router.post('/', Controller.create)
router.get('/', Controller.find)
router.get('/last', Controller.findOneLastUser)

module.exports = router
