import type { Request, Response } from "express";
import User from "../database/models/userModel.js";




class UserController{
    static async register(req:Request, res:Response){
        const {username,email,password} = req.body
        if(!username || !email || !password){
            res.status(400).json({
                message : "Please provide username,email,password"
            })
            return
        }

        await User.create({
            username,
            email,
            password
        })

        res.status(201).json({
            message : "User registered succesfully"
        })
    }
}

export default UserController