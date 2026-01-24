const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    role: {
        type: String,
        enum: ["user", "admin", "vendor"],
        default: "user"
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("User", userSchema)