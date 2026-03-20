const express = require("express")
const mongoose = require('mongoose')

require("dotenv").config()

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const vendorRouter = require('./routes/vendor.routes')
const adminRouter = require('./routes/admin.routes')
const productRouter = require('./routes/product.routes')

const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/vendor', vendorRouter)
app.use('/api/admin', adminRouter)
app.use('/api/products', productRouter)

//middleware for unknown route handling
app.use((req, res, next) => {
    res.status(404).send("<h1>404 Not Found</h1>");
});

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("mongodb connected")
        app.listen(5000, () => {
            console.log("server is running on port 5000")
        })
    })
    .catch(err => console.log(err))

