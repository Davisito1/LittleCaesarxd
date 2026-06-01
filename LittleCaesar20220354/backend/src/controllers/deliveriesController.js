import deliveriesModel from "../models/deliveries.js"
import {v2 as cloudinary} from "cloudinary"

const deliveriesController = {}

deliveriesController.gtDeliveries = async (req, res) => {
    try {
        const deliveries = await deliveriesModel.find()
        return res.status(200).json(deliveries)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveriesController.insertDeliveries = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body

        const newDeliveries = await deliveriesModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        await newDeliveries.save()

        return res.status(200).json({message: "Deliveries saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveriesController.updateDeliveries = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body

        const deliveriesFound = await deliveriesModel.findById(req.params.id)

        if (!deliveriesFound) {
            return res.status(404).json({message: "Deliveries not found"})
        }

        const updteData = {
            name,
            phone,
            cars,
            isActive
        }

        if (req.file) {
            await cloudinary.uploader.destroy(deliveriesFound.public_id)

            updteData.image = req.file.path
            updteData.public_id = req.file.filename
        }

        await deliveriesModel.findByIdAndUpdate(req.params.id, updteData, {new: true})

        return res.status(200).json({message: "Deliveries updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveriesController.deleteDeliveries = async (req, res) => {
    try {
        const deliveriesFound = await deliveriesModel.findById(req.params.id)

        if (!deliveriesFound) {
            return res.status(404).json({message: "Deliveries not found"})
        }

        await cloudinary.uploader.destroy(deliveriesFound.public_id)

        await deliveriesModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Deliveries deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default deliveriesController