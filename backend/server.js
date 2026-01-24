const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const User = require("./models/User")
require("dotenv").config()

const app = express()

app.use(express.json())

app.post('/register', async(req, res) => {
    try {
        const {name, email, password, role} = req.body
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

