const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const Vendor = require("./models/Vendor")
const jwt = require("jsonwebtoken")
const { isAdmin, isVendor, validToken } = require("./middlewares/roleAuth")

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const vendorRouter = require('./routes/vendor.routes')

require("dotenv").config()

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/vendor', vendorRouter)

app.get("/api/admin/vendor/requests",validToken, isAdmin, async(req, res) => {
    //will check for vendor requests, edit role for vendor and change it to vendor and edit vendorId for user and fill that
    //list all vendors with pending status
    try {
        //we can filter out status pending or rejected or approved based on search query
        const {type} = req.query
        // console.log("query", req.query)
        const vendors = await Vendor.find(type ? {status: type} : {}) //pending vendors
        return res.status(200).json({success: true, vendors})
        // console.log("vendors", vendors) 
    } catch (error) {
        console.log("error in admin vendor request", error)
    }
    // res.send("here in vendor request")
})

//make a rejected vendors endpoint -- made in request endpoint

app.post("/api/admin/vendor/:vendorId", validToken, isAdmin, async(req, res) => {
    try {
        const vendorId = req.params.vendorId
        const {status} = req.body
        const vendor = await Vendor.findById(vendorId)
        const user = await User.findById(vendor.user)
        if(status === 'approved') {
            user.vendorId = vendorId
            user.role = "vendor"
            vendor.status = "approved"
            await user.save()
            await vendor.save()
            return res.status(200).json({success: true, msg: "operations completed"})
        }
        if(status === 'rejected') {
            user.vendorId = vendorId
            vendor.status = "rejected"
            await user.save()
            await vendor.save()
            return res.status(200).json({success: true, msg: "request rejected"})
        }
        // return res.status(400).json({success: false, msg: "please approve the vendor first"})
        // console.log("vendor", vendor, user)
    } catch (error) {
        console.log("error in updating vendor status", error)
    }
})

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>")
})

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("mongodb connected")
        app.listen(5000, () => {
            console.log("server is running on port 5000")
        })
    })
    .catch(err => console.log(err))

