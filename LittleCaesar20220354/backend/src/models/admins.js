import {Schema, model} from "mongoose";

const adminsModel = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
});

export default model('admins', adminsModel);