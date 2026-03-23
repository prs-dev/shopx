const Product = require('../models/Product')

const allProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            products
        })
    } catch (error) {
        console.log("error in fetching products", error)
    }
    
    res.send('allproducts')
}

const createProduct = async(req, res) => {
    res.send('createproducts')
}

const updateProduct = async(req, res) => {
    res.send('updateproducts')
}

const deleteProduct = async(req, res) => {
    res.send('delproducts')
}

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct
}