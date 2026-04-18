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

const updateCategory = async(req, res) => {
    //add products or can be used to just update name or description
    try {
        const body = req.body
        const categoryId = req.params.id
        const category = await Category.findByIdAndUpdate(categoryId, body, {
            new: true
        })
        return res.status(200).json({msg: "category updated", category})
    } catch (error) {
        console.log("error in updating category", error)
    }

}

const deleteCategory = async(req, res) => {
    const categoryId = req.params.id
    //need to remove from category collection
    const deletedCategory = await Category.findByIdAndDelete(categoryId, {
        new: true
    })
    return res.status(200).json({msg: "category deleted", deletedCategory})
}

const allCategories = async(req, res) => {
    try {
        const categories = await Category.find({})
        return res.status(200).json({categories})
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