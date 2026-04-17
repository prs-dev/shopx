const Category = require("../models/Category")
const Product = require('../models/Product')

const createCategory = async(req, res) => {
    try {
        const {name, description} = req.body
        const categoryExists = await Category.findOne({name})
        if(categoryExists) return res.status(400).json({msg: "duplicate category"})
        const newCategory = new Category({
            name,
            description
        })
        await newCategory.save()
        res.status(200).json({msg: "Category Created"})
    } catch (error) {
        console.log('error while creating category', error)
    }
}

const updateCategory = (req, res) => {
    //add products or can be used to just update name or description

}

const deleteCategory = (req, res) => {

}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}