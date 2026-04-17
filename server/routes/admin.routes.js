const { validToken, isAdmin } = require("../middlewares/roleAuth")
const {vendorRequests, vendorStatusUpdate} = require('../controllers/admin.controller')
const {createCategory, updateCategory, deleteCategory} = require('../controllers/category.controller')

const router = require("express").Router()

router.get("/vendor/requests", validToken, isAdmin, vendorRequests)
router.post("/vendor/:vendorId", validToken, isAdmin, vendorStatusUpdate)

//categories
router.post('/category/create', validToken, isAdmin, createCategory)
router.put('/category/update/:id', validToken, isAdmin, updateCategory)
router.delete('/category/delete/:id', validToken, isAdmin, deleteCategory)

module.exports = router