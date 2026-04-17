const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },
    price: Number,
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    stock: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("Product", productSchema)