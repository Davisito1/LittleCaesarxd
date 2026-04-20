import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import { config } from "../../config.js";

import customerModel from "../models/customers.js"

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try{
        //Solicitar
        const { email, password } = req.body;

        //Verificar si el correo existe en la base de datos
        const customerFound = await customerModel.findOne({email})

        //Si no existe el correo
        if (!customerFound) {
            return res.status(400).json({message: "Customer not found"})
        }

        //Verificamos que la cuenta no esté bloqueada
        if (customerFound.timeOut && customerFound.timeOut > Date.now()) {
            return res.status(403).json({message: "Blocked account"})
        }

        //Validar la contraseña
        const isMatch = await bcrypt.compare(password, customerFound.password)

        if (!isMatch) {
            customerFound.loginAttempts = (customerFound.loginAttempts || 0) + 1
            
            if (customerFound.loginAttempts >= 5) {
                customerFound.timeOut = Date.now() + 5 * 60 * 1000
                customerFound.loginAttempts = 0

                await customerFound.save()

                return res.status(403).json({message: "Blocked account for many attemps"})
            }

            await customerFound.save();

            return res.status(401).json({message: "Wrong password"})
        }

        customerFound.loginAttempts = 0
        customerFound.timeOut = null;

        const token = jsonwebtoken.sign(
            // ue vamos a guardar?
            {id: customerFound._id, userType: "customer"},
            //Secret key
            config.JWT.secret,
            //Cuando expira
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token);

        return res.status(200).json({message: "Login succesfull"})
    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginCustomerController