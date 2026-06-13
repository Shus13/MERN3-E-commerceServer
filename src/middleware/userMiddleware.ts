import type { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import User from "../database/models/userModel.js";

export enum Role{
    Admin = 'admin',
    Customer = 'customer'
}

export interface IExtendedRequest extends Request{
    user? : {
        username : string,
        email : string,
        role : string,
        password : string,
        id : string
    }
}

class UserMiddleware{
    async isUserLoggedIn(req:Request, res:Response, next:NextFunction):Promise<void>{
        const token = req.headers.authorization
        if(!token){
            res.status(403).json({
                message : "Token must be provided"
            })
            return
        }

        jwt.verify(token, envConfig.jwtSecretKey as string, async (err, result:any) => {
            if(err){
                res.status(403).json({
                    message : "Invalid token!!!"
                })
            }else{
                const userData = await User.findByPk(result.userId)
                if(!userData){
                    res.status(404).json({
                        message : "No user with that userId"
                    })
                    return
                }
                (req as IExtendedRequest).user = userData
                next()
            }
        })
    }
    accessTo(...roles:Role[]){
        return(req:Request, res:Response,next:NextFunction)=>{
            let userRole = (req as IExtendedRequest).user?.role as Role
            console.log(userRole)
            if (!roles.includes(userRole)) {
                res.status(403).json({ 
                    message: "You do not have permission to perform this action" 
                });
                return;
            }
            next()
        }
    }
}



export default new UserMiddleware