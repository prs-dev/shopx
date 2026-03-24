const Vendor = require("../models/Vendor")

const createVendor = async (req, res) => {
    try {
        // console.log("vendor", req.body)
        const { name, description } = req.body
        if (!name || !description) return res.status(400).json({ msg: "please provide all fields!" })
        const vendorExists = await Vendor.findOne({ user: req.id })
        // let user = await User.findByIdAndUpdate(req.id, {role: "vendor"}) //this should be done by admin
        if (vendorExists) return res.status(400).json({ msg: "You already submitted the request!" })
        const newVendor = new Vendor({
            name, description, user: req.id
        })
        await newVendor.save()
        // console.log("user", user)
        // await user.save()
        return res.status(201).json({
            msg: "Your vendor request has been submitted!"
        })
    } catch (error) {
        console.log("error while creating vendor", error)
    }
}

const vendorDetails = async(req, res) => {
    try {
        // console.log("user", req.user)
        const vendorData = await Vendor.findOne({user: req.user._id})
        if(!vendorData) return res.status(400).json({msg: "associated vendor not found!"})
        return res.json({msg: "vendor data", vendor: vendorData})
    } catch (error) {
        console.log("error in vendor data fetching", error)
    }
}

module.exports = {
    createVendor,
    vendorDetails
}