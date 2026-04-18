const router = require("express").Router()
const {allCategories} = require('../controllers/category.controller')

router.get('/all', allCategories)

module.exports = router
