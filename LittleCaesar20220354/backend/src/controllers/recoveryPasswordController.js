import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemail from "nodemailer";
import HTMLRecoveryEmail from "../utils/sendEmailRecovery.js";

import {config} from "../config.js";
import customerModel from '../models/customerModel.js';

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    try {
        const {email} = req.body;

        const userFound = await customerModel.findOne({email});

        if (!userFound) {
            return res.status(400).json({message: "User not found"});
        }

        //Generamos un codigo alatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            //que vamos a guardar
            {email, randomCode, userTyepe: "customer", verified: false},
            //secret key
            config.JWT.secret,
            //cuando expira
            {expiresIn: "15m"}
        );

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        //enviar el codigo por crreo electronico
        const transporter = nodemail.createTransport({
            service: "gmail",
            auth: {
                user: config.USER_EMAIL,
                pass: config.USER_PASSWORD
            }
        });

        //quien lo recibe y como lo recibe
        const mailOptions = {
            from: config.USER_EMAIL,
            to: email,
            subject: "Recuperación de constraseña",
            body: "El código vence en 15 minutos",
            html: HTMLRecoveryEmail(randomCode)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({message: "Error sending mail"})
            }
            return res.status(200).json({message: "email sent"})
        });
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})       
    }

    recoveryPasswordController.verifyCode = async (req, res) => {
        try {
            const {code} = req.body;

            //obtenemos la informacion que esta dentro del token
            //accedemos a la cookie
            const token = req.cookies.recoveryCookie;
            const decoded = jsonwebtoken.verify(token, config.JWT.secret);

            //comparar el codigo que el usuario escribio con el que esta guardado en el token
            if (code !== decoded.randomCode) {
                return res.status(400).json({message: "Invalid code"})
            }

            const newToken = jsonwebtoken.sign(
                //que vamos a guardar
                {email: decoded.email, userTyepe: "customer", verified: true},
                //secret key
                config.JWT.secret,
                //cuando expira
                {expiresIn: "15m"},
            );

            res.cookie("recoveryCoookie", newToken, {maxAge: 15 * 60 * 1000});

            return res.status(200).json({message: "Code verified successfully"})
        } catch (error) {
            console.log("error" + error)
            return res.status(500).json({message: "Internal server error"})
        }
    }
}

recoveryPasswordController.newPassword = async (req,res) => {
    try {
        const {newPassword, confirmPassword} = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({message: "Password doesnt match"})
        }

        //comprobar que la constante verified que esta en el token sea true 
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.status(400).json({message: "Code not verified"})
        }

        //encriptar la contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);

        //actualizar la contraseña de la base de datos
        await customerModel.findOneAndUpdate({email: decoded.email}, {password: passwordHash}, {new: true});

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}