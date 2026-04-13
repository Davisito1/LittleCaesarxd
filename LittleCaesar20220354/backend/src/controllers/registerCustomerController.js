import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import customers from "../models/customers.js";
import config from "../config.js";

const registerCustomerController = {};

registerCustomerController.registerCustomer = async (req, res) => {
    try {
        const {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        const existingCustomer = await customers.findOne({ email });

        if (existingCustomer) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Encriptar la contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //Generar un codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            birthdate,
            email,
            password: passwordHashed,
        },
        config.JWT.secret,
        {
            expiresIn: "15m"
        }
        );

        res.cookies("registrationCookie", token, {maxAge: 15 * 60 * 1000});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
}