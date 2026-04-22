const Category = require("../models/Category")
const Product = require('../models/Product')

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const categoryExists = await Category.findOne({ name })
        if (categoryExists) return res.status(400).json({ msg: "duplicate category" })
        const newCategory = new Category({
            name,
            description
        })
        await newCategory.save()
        res.status(200).json({ msg: "Category Created" })
    } catch (error) {
        console.log('error while creating category', error)
    }
}

const updateCategory = async (req, res) => {
    // can be used only to update name or description, products can be added using update products api endpoint
    try {
        const body = req.body
        const categoryId = req.params.id
        const category = await Category.findByIdAndUpdate(categoryId, body, {
            new: true
        })
        return res.status(200).json({ msg: "category updated", category })
    } catch (error) {
        console.log("error in updating category", error)
    }

}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    //need to remove from category collection
    const deletedCategory = await Category.findByIdAndDelete(categoryId, {
        new: true
    })
    const products = await Product.find({ category: categoryId })
    console.log(products)
    if (products.length > 0) {
        // products.forEach(product => product._doc.category = '') //bad
        // const updatedProducts = products.map(item => ({...item._doc, category: ''})) //bad
        await Promise.all(products.map(item => { //update product category field to null
            item.category = null
            return item.save() //return because promise.all expects return, as forEach will not return anything
        }))

        //can use this -- not tested it
        // await Product.updateMany(
        //     { category: categoryId },
        //     { $unset: { category: "" } }
        // );

        // console.log("updated products", products)
    }
    return res.status(200).json({ msg: "category deleted", deletedCategory })
}

const allCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        return res.status(200).json({ categories })
    } catch (error) {
        console.log("error in all categories", error)
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    allCategories
}