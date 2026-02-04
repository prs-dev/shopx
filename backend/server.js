const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const jwt = require("jsonwebtoken")
const {isAdmin, isVendor} = require("./middlewares/roleAuth")
require("dotenv").config()

const app = express()

app.use(express.json())

app.post('/api/register', async(req, res) => {
    try {
        const {name, email, password, role} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                msg: "Please provide all the fields!"
            })
        }
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({msg: "User already exists, log in"})
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12))
        const newUser = new User({
            name, email, password: hashedPassword, role
        })
        await newUser.save()
        res.status(200).json({
            msg: "user created",
            user: newUser
        })
    } catch (error) {
        console.log("error in register endpoint", error)
    }
})

app.post("/api/login", async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(400).json({msg: 'Please provide all the fields!'})
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({
            msg: "user not found!"
        })
        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) return res.status(400).json({
            msg: "invalid credentials!"
        })
        const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET)
        return res.status(200).json({
            msg: "signed in successfully",
            token
        })
    } catch (error) {
        console.log("error in login endpoint", error)
    }
})

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.get("/admin-test", isAdmin, (req, res) => {
    console.log(req.user)
    return res.status(200).send("hey this is admin route and you should be an admin, right ?")
})

app.get("/vendor-test", isVendor, (req, res) => {
    return res.status(200).send("hey this is vendor route and you should be an vendor, right ?")
})

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("mongodb connected")
        app.listen(5000, () => {
            console.log("server is running on port 5000")
        })
    })
    .catch(err => console.log(err))

