const employeesController = {};

import employeesModel from "../models/employees.js";

employeesController.getEmployes = async (req, res) => {
    try {
        const employees = await employeesModel.find()
        return res.status(200).json(employees)
    } catch (error) {
        console.log("error" + error)
        return res.json(500).json({message: "Internal server error"})
    }
}

employeesController.insertEmployee = async (req, res) => {
    try {
        let {
            name, 
            lastName, 
            DUI, 
            birthdate,
            email, 
            password,
            isVerified,
            status,
            idBranch,
        } = req.body;

        //validaciones
        //sanitizar
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        //campos requeridos
        if (!name || !email || !password) {
            return res.status(400).json({message: "Field required"})
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({message: "name must be real"})
        }

        if (birthdate > new Date || birthdate < new Date("1910-01-01")) {
            return res.status(400).json({message: "Invalid date"})
        }

        if (DUI.length > 10 || DUI.length < 9) {
            return res.status(400).json({message: "Invalid DUI"});
        }

        const newEmployee = new employeesModel({
            name,
            lastName,
            DUI,
            birthdate,
            email,
            password,
            isVerified,
            status,
            idBranch
        });

        await newEmployee.save();
        return res.status(201).json({message: "Employee saved"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

employeesController.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id)

        if (!deleteEmployee) {
            return res.status(400).json({message: "Employee not found"})
        }

        return res.status(200).json({message: "Employee deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

employeesController.updateEmployee = async (req, res) => {
    try {
        let {
            name, 
            lastName, 
            DUI, 
            birthdate,
            email, 
            password,
            isVerified,
            status,
            idBranch,
        } = req.body;

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({message: "Field required"})
        }

        if (name.length < 3 || name.length > 20) {
            return res.status(400).json({message: "name must be real"})
        }

        if (birthdate > new Date || birthdate < new Date("1910-01-01")) {
            return res.status(400).json({message: "Invalid date"})
        }

        if (DUI.length > 10 || DUI.length < 9) {
            return res.status(400).json({message: "Invalid DUI"});
        }

        const employeeUpdated = await employeesModel.findByIdAndUpdate(
            req.params.id,
            {
                name, 
                lastName, 
                DUI, 
                birthdate,
                email, 
                password,
                isVerified,
                status,
                idBranch,
            }, {new: true}
        )

        if (!employeeUpdated) {
            return res.status(400).json({message: "Employee not found"})
        }

        return res.status(200).json({message: "Employee updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default employeesController