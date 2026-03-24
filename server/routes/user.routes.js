const { validToken } = require("../middlewares/roleAuth")
const {userDetails} = require("../controllers/user.controller")

const router = require("express").Router()

router.get('/', validToken, userDetails)

module.exports = router