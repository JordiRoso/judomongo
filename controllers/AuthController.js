import User from "../models/User";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

AuthController.register = async (req, res) => {
    console.log(req.body);

    try{
        const { name, email, password } = req.body;

        if (password.length < 6) {
            return res.status(500).json({
                success: false,
                message: "Password is shorter than 6 characters",
            });
        }

        const encryptedPassword = hashSync(password, 10);

        const newUser = {
            name: name,
            email: email,
            password: encryptedPassword,
        };

        await User.create(newUser);

        return res.status(200).json({
            success: true,
            message: "Create user succssfully",
        });
    }catch(error){
        return res.status(500).json({
            succes: false,
            message: "Error creating user",
            error: error?.message || error,
        });
    }
};