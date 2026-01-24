const express = require("express")
const mongoose = require('mongoose')
require("dotenv").config()
const app = express()
const User = require("./models/User")
app.post('/register', async(req, res) => {
    const newUser = new User({
        name: "test",
        email: "test",
        password: "1234"
    })
    await newUser.save()
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

