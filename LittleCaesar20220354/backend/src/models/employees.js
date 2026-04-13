import moongose, {Schema, model} from "mongoose";

const employeesModel = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    DUI: {
        type: String
    },
    birthdate: {
        type: Date
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {   
        type: Boolean
    },
    status: {
        type: String
    },
    idBranch: {
        type: moongose.Schema.Types.ObjectId,
        ref: "branches"
    },  
}, {
    timestamps: true,
    strict: false
});

export default model('employees', employeesModel);