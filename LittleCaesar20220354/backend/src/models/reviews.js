import moongose, {Schema, model} from "mongoose"

const reviewsModel = new Schema({
    idEmployee: {
        type: moongose.Schema.Types.ObjectId,
        ref: "employees"
    },
    idPizza: {
        type: moongose.Schema.Types.ObjectId,
        ref: "pizzas"
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("reviews", reviewsModel)