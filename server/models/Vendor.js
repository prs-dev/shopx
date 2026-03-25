const mongoose = require("mongoose")

const VendorSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: "pending"
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
     products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = new mongoose.model("Vendor", VendorSchema)
