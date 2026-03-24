const { validToken, isAdmin } = require("../middlewares/roleAuth")
const {vendorRequests, vendorStatusUpdate} = require('../controllers/admin.controller')

const router = require("express").Router()

router.get("/vendor/requests", validToken, isAdmin, vendorRequests)
router.post("/vendor/:vendorId", validToken, isAdmin, vendorStatusUpdate)

module.exports = router