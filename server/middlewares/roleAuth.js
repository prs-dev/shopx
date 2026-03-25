const User = require("../models/User")
const jwt = require('jsonwebtoken')
const Vendor = require("../models/Vendor")
require("dotenv").config()

const validToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    // console.log("toke", token)
    const details = jwt.verify(token, process.env.SECRET)
    if(!details) return res.status(400).json({
        msg: "invalid token"
    })
    req.id = details.id
    // console.log("dte", details)
    next()
}

const isAdmin = async(req, res, next) => {
    try {
        const userId = req.id //user id
        const user = await User.findOne({_id: userId})
        if(!user) return res.status(400).json({msg: "Invalid token!"})
        if(user.role !== "admin") return res.status(401).json({msg: "You are not authorized!"})
        req.user = user
        // console.log("token", token, userDetails)
        next()
    } catch (error) {
        console.log("error in admin auth middleware", error)
    }
    // console.log("here in admin middleware")
}

const isVendor = async(req, res, next) => {
    try {
        const userId = req.id //user id
        const user = await User.findOne({_id: userId})
        if(!user) return res.status(400).json({msg: "Invalid token!"})
            // console.log("user", user, (user.role !== "admin"))
        if(user.role === "user") return res.status(401).json({msg: "You are not authorized!"})
            req.user = user
        // console.log("token", token, userDetails)
        next()
    } catch (error) {
        console.log("error in vendor auth middleware", error)
    }
}

module.exports = {
    isAdmin,
    isVendor,
    validToken
}