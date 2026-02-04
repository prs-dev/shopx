const User = require("../models/User")
const jwt = require('jsonwebtoken')
require("dotenv").config()

const isAdmin = async(req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const userDetails = jwt.verify(token, process.env.SECRET)
        const userId = userDetails.id 
        const user = await User.findOne({_id: userId})
        if(!user) return res.status(400).json({msg: "Invalid token!"})
        if(user.role !== "admin") return res.status(401).json({msg: "You are not authorized!"})
        req.user = user
        console.log("token", token, userDetails)
        next()
    } catch (error) {
        console.log("error in admin auth middleware", error)
    }
    // console.log("here in admin middleware")
}

const isVendor = async(req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const userDetails = jwt.verify(token, process.env.SECRET)
        const userId = userDetails.id 
        const user = await User.findOne({_id: userId})
        if(!user) return res.status(400).json({msg: "Invalid token!"})
        if(user.role === "user") return res.status(401).json({msg: "You are not authorized!"})
        req.user = user
        console.log("token", token, userDetails)
        next()
    } catch (error) {
        console.log("error in vendor auth middleware", error)
    }
}

module.exports = {
    isAdmin,
    isVendor
}