import type { Request, Response } from "express";
import User from "../database/models/userModel.js";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken.js";
import generateOtp from "../services/generateOtp.js";
import sendMail from "../services/sendMail.js";
import findData from "../services/findData.js";
import sendResponse from "../services/sendResponse.js";
import checkOtpExpiration from "../services/checkOtpExpiration.js";



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

        await sendMail({
            to : email, 
            subject : "Registration successfull on Ecommerce Sushit", 
            text : "Welcome to Ecommerce Sushit, Thank you for registering"
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
                const token = generateToken(user.id)
                res.status(200).json({
                    message : "Logged in success",
                    token
                })
            }
        }
        // if pass milyo then => token generate garney (jwt)
    }
    static async handleForgetPassword(req:Request, res:Response){
        const {email} =req.body
        if(!email){
            res.status(400).json({
                message : "Please provide email"
            })
            return
        }

        // const [user] = await User.findAll({
        //     where : {
        //         email : email
        //     }
        // })
        const user = await findData(User,email)
        if(!user){
            res.status(400).json({
                message : "Email not registered"
            })
            return
        }
        // opt pathauney
        const otp = generateOtp()
        await sendMail({
            to : email,
            subject : "Ecommerce site password change",
            text : `You just request to change the password, Here is the otp, ${otp}`
        })
        user.otp = otp.toString()
        user.otpGenerateTime = Date.now().toString()
        await user.save()

        res.status(200).json({
            message : "Password reset otp sent!!!"
        })
    }
    static async verifyOtp(req:Request, res:Response){
        const{otp,email} = req.body
        if(!otp || !email){
            sendResponse(res,400, "Please provide otp and email")
            return
        }
        const user = await findData(User,email)
        if(!user){
            sendResponse(res,404,"Mo user with that email")
            return
        }
        // otp verification
        const [data] = await User.findAll({
            where : {
                otp,
                email
            }
        })
        if(!data){
            sendResponse(res,404,"Invalid OTP")
            return
        }
        const otpGenerateTime = data.otpGenerateTime
        checkOtpExpiration(res, otpGenerateTime,120000)
    }
    static async resetPassword(req:Request, res:Response){
        const {newPassword,confirmPassword,email} = req.body
        if(!newPassword || !confirmPassword || !email){
            sendResponse(res,400,"Please provide NewPassword, ConfirmPassword,Email")
            return
        }
        if(newPassword !== confirmPassword){
            sendResponse(res,400,"NewPassword and ConfirmPassword must be same")
            return
        }
        const user = await findData(User, email)
        if(!user){
            sendResponse(res,404,"No email with that user")
            return
        }
        await sendMail({
            to : email,
            subject : "Ecommerce site password changed successfully",
            text : `You have just changed the password`
        })
        user.password = bcrypt.hashSync(newPassword,12)
        await user.save()
        sendResponse(res,200,"Password reset successfully!!!")
    }
}

export default UserController