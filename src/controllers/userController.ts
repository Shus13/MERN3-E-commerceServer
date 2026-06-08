import type { Request, Response } from "express";
import User from "../database/models/userModel.js";
import bcrypt from 'bcrypt'



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
            password : bcrypt.hashSync(password,12)
        })

        res.status(201).json({
            message : "User registered succesfully"
        })
    }
    static async login(req:Request, res:Response){
        // accept incomming data => email, password
        const {email,password} = req.body

        if(!email || !password){
            res.status(400).json({
                message : "Please provide email,password"
            })
            return
        }
        // check email existance
        const [user] = await User.findAll({
            where : {
                email : email
            }
        })
        // if yes => check password
        if(!user){
            res.status(404).json({
                message : "No user with that email"
            })
        }else{
            const isEqual = bcrypt.compareSync(password,user.password)
            if(!isEqual){
                res.status(400).json({
                    message : "Invalid password"
                })
            }else{
                res.status(200).json({
                    message : "Logged in success"
                })
            }
        }
        // if pass milyo then => token generate garney (jwt)
    }
}

export default UserController