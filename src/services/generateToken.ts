
import jwt from 'jsonwebtoken'
import { envConfig } from '../config/config.js'
import { type StringValue } from 'ms'

const generateToken = (userId : string) => {
    const token = jwt.sign({userId : userId}, envConfig.jwtSecretKey as string,{
        expiresIn : envConfig.jwtExpiresIn as StringValue
    })
    return token
}

export default generateToken