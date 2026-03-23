const Product = require('../models/Product')

const allProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            products
        })
    } catch (error) {
        console.log("error in fetching products", error)
    }

    // res.send('allproducts')
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body
        if (!name || !description || !price || !stock) return res.status(400).json({ success: false, msg: "Please provide all the fields!" })
        const productExists = await Product.findOne({ name })
        if (productExists) return res.status(400).json({ success: false, msg: "do not create duplicate products!" })
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            vendor: req.id
        })
        await newProduct.save()
        return res.status(201).json({ success: true, msg: "product created", product: newProduct })
    } catch (error) {
        console.log("error in creating product", error)
    }
    // res.send('createproducts')
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const productExists = await Product.findOne({ _id: productId })
        if (!productExists) return res.status(400).json({ success: false, msg: "product does not exist!" })
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        return res.status(200).json({
            success: true,
            msg: "Product Updated"
        })
    } catch (error) {
        console.log("error in updating product", error)
    }
    // res.send('updateproducts')
}

const deleteProduct = async (req, res) => {
     try {
        const productId = req.params.id
        const productExists = await Product.findOne({ _id: productId })
        if (!productExists) return res.status(400).json({ success: false, msg: "product does not exist!" })
        const deletedProduct = await Product.findByIdAndDelete(productId, { new: true })
        return res.status(200).json({
            success: true,
            msg: "Product Deleted"
        })
    } catch (error) {
        console.log("error in updating product", error)
    }
    // res.send('delproducts')
}

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct
}