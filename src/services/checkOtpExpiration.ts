import type { Response } from "express"
import sendResponse from "./sendResponse.js"




const checkOtpExpiration = (res:Response, otpGenerateTime:string, thresholdTime:number, )=> {
    const currentTime = Date.now()
    if(currentTime - parseInt(otpGenerateTime) <= thresholdTime){
        sendResponse(res,200,"Valid OTP, now you can proceed to reset password")
    }else{
        sendResponse(res,403,"OTP expires, Sorry try again later!!!")
    }
}


export default checkOtpExpiration