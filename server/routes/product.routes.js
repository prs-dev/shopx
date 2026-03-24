const { isVendor, validToken } = require("../middlewares/roleAuth")
const {createProduct, allProducts, updateProduct, deleteProduct} = require('../controllers/product.controller')
const router = require("express").Router()

router.get("/", validToken, isVendor, allProducts)
router.post("/create", validToken, isVendor, createProduct)
router.put("/update/:id", validToken, isVendor, updateProduct)
router.delete("/delete/:id", validToken, isVendor, deleteProduct)

module.exports = router