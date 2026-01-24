const express = require("express")
const mongoose = require('mongoose')
const app = express()

app.post('/register', (req, res) => {

})

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.listen(5000, () => {
    console.log("server is running on port 5000")
})