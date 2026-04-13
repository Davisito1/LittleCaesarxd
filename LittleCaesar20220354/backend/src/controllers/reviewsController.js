import employees from "../models/employees.js"
import reviewsModel from "../models/reviews.js"

const reviewsController = {}

reviewsController.getReview = async (req, res) => {
    try {
        const reviews = await reviewsModel.find()
        return res.status(200).json(employees)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

reviewsController.insertReview = async (req, res) => {
    try {
        let {
            idEmployee,
            idPizza,
            rating,
            comment
        } = req.body;

        comment = comment?.trim()

        if (!comment) {
            return res.status(400).json({message: "Field required"})
        }

        const newReview = new reviewsModel({
            idEmployee,
            idPizza,
            rating,
            comment
        })

        await newReview.save()
        return res.status(201).json({message: "Review saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

reviewsController.deleteReview = async (req, res) => {
    try {
        const deleteReview = await reviewsModel.findByIdAndDelete(req.params.id)

        if (!deleteReview) {
            return res.status(400).json({message: "Review not found"})
        }

        return res.status(200).status({message: "Review deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}