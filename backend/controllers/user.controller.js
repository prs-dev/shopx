const User = require("../models/User")

const userDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.id }).select({ password: 0 })
        return res.status(200).json({ user })
    } catch (error) {
        console.log("error in retrieving user info", error)
    }
}

module.exports = {
    userDetails
}