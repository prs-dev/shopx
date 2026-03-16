const { validToken, isVendor } = require("../middlewares/roleAuth")
const router = require("express").Router()
const {vendorDetails, createVendor} = require("../controllers/vendor.controller")

router.get('/', validToken, isVendor, vendorDetails )
router.post('/create', validToken, createVendor)

module.exports = router