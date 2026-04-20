const Product = require('../models/Product')
// const User = require('../models/User')
const Vendor = require('../models/Vendor')
const Category = require('../models/Category')

const allProducts = async (req, res) => {
    try {
        // const products = await Product.find({ vendor: req.id }) //it finds all products irrespective of correct vendor or not, so we need only those who is created by current vendor
        // const products = await Product.find(req.user?.vendorId ? { vendor: req.user.vendorId } : {}) // removed token from this, anybody can view products
        const vendorId = req.query.vendorId
        const products = await Product.find(vendorId ? {vendor: vendorId} : {})
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
        const { name, description, price, stock, category } = req.body
        if (!name || !description || !price || !stock) return res.status(400).json({ success: false, msg: "Please provide all the fields!" })
        const productExists = await Product.findOne({ name, vendor: req.user.vendor })
        if (productExists) return res.status(400).json({ success: false, msg: "do not create duplicate products!" })
        const vendor = await Vendor.findOne({ _id: req.user.vendorId })
        const existingCategory = await Category.findOne({_id: category})
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            vendor: req.user.vendorId
        })
        await newProduct.save()
        vendor.products = [...vendor.products, newProduct._id]
        await vendor.save()
        existingCategory.products = [...existingCategory.products, newProduct._id]
        await existingCategory.save()
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
        //check for correct vendor
        // console.log("test", productExists.vendor.toString(), req.user.vendorId.toString())
        if (productExists.vendor?.toString() !== req.user.vendorId?.toString() && req.user.role !== 'admin') return res.status(400).json({
            success: false,
            mmsg: "You are not authorized to perform this operation!"
        })
        // console.log(productExists, req.user)
        // console.log("testing update")
        // console.log("req.body", req.body)
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        if(req.user.role === "admin") { //if admin is changing the category, otherwise vendor will only update the category
            const existingCategory = await Category.findOne({_id: req.body.category})
            existingCategory.products = [...existingCategory.products, req.body._id]
            await existingCategory.save()
        }
        return res.status(200).json({
            success: true,
            msg: "Product Updated",
            updatedProduct
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
        //check for correct vendor
        if (productExists.vendor.toString() !== req.user.vendorId.toString()) return res.status(400).json({
            success: false,
            mmsg: "You are not authorized to perform this operation!"
        })
        const vendor = await Vendor.findOne({ _id: req.user.vendorId })
        const deletedProduct = await Product.findByIdAndDelete(productId, { new: true })
        vendor.products = vendor.products.filter(item => item._id.toString() !== productId)
        await vendor.save()
        return res.status(200).json({
            success: true,
            msg: "Product Deleted"
        })
    } catch (error) {
        console.log("error in updating product", error)
    }
    // res.send('delproducts')
}

const singleProduct = async(req, res) => {
    try {
        const productId = req.params.id
        const productExists = await Product.findOne({ _id: productId })
        if (!productExists) return res.status(400).json({ success: false, msg: "product does not exist!" })
        //check for correct vendor
        if (productExists.vendor.toString() !== req.user.vendorId.toString()) return res.status(400).json({
            success: false,
            mmsg: "You are not authorized to perform this operation!"
        })
        return res.status(200).json(productExists)
    } catch (error) {
        console.log("error in fetching details of single product", error)
    }
}

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    singleProduct
}