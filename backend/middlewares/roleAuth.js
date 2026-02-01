const User = require("../models/User")
const jwt = require('jsonwebtoken')
require("dotenv").config()

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const userDetails = jwt.verify(token, process.env.SECRET)
        console.log("token", token, userDetails)
    } catch (error) {
        console.log("error in admin auth middleware", error)
    }
    // console.log("here in admin middleware")
    next()
}

const isVendor = (req, res, next) => {
    console.log("here in vendor middleware")
    next()
}

module.exports = {
    isAdmin,
    isVendor
}