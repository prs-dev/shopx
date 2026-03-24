const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "Please provide all the fields!"
            })
        }
        const userExists = await User.findOne({ email })
        if (userExists) return res.status(400).json({ msg: "User already exists, log in" })
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
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ msg: 'Please provide all the fields!' })
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({
            msg: "user not found!"
        })
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return res.status(400).json({
            msg: "invalid credentials!"
        })
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET)
        return res.status(200).json({
            msg: "signed in successfully",
            token
        })
    } catch (error) {
        console.log("error in login endpoint", error)
    }
}

module.exports = {
    registerUser,
    loginUser
}