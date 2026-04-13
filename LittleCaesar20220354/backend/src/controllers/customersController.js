import customersModel from "../models/customers.js";

const customersController = {};

customersController.getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.find()
        return res.status(200).json(customers)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

customersController.updateCustomer = async (req, res) => {
    try {
        let {
            name, 
            lastName, 
            birthdate,
            email, 
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({message: "Fields required"});
        }

        if (name.length < 3 || name.length > 50) {
            return res.status(400).json({message: "Name must be real"});
        }

        const customerUpdated = await customersModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        }, { new: true });

        if (!customerUpdated) {
            return res.status(400).json({message: "Customer not found"});
        }

        return res.status(200).json({message: "Customer updated"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

customersController.deleteCustomer = async (req, res) => {
    try {
        const customerDeleted = await customersModel.findByIdAndDelete(req.params.id);  
        if (!customerDeleted) {
            return res.status(404).json({message: "Customer not found"});
        }
        return res.status(200).json({message: "Customer deleted"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default customersController;