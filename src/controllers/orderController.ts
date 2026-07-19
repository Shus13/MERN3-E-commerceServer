import type { Request, Response } from "express";
import Order from "../database/models/orderModel.js";
import OrderDetails from "../database/models/orderDetails.js";
import Payment from "../database/models/paymentModel.js";
import { PaymentMethod } from "../globals/types/index.js";

interface IProduct{
    productId : string,
    productQty : string
}

interface OrderRequest extends Request{
    user? : {
        id : string
    }
}

class OrderController{
    async createOrder(req:OrderRequest, res:Response):Promise<void>{
        const userId = req.user?.id
        const{phoneNumber, shippingAddress, totalAmount, paymentMethod } = req.body
        const products:IProduct[] = req.body.products
        if(!phoneNumber || !shippingAddress || !totalAmount || products.length == 0){
            res.status(400).json({
                mesage : "Please provide phoneNumber, shippingAddress, totalAmount, Product"
            })
            return
        }
        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId
        })
        products.forEach(async function(product){
            await OrderDetails.create({
                quantity : product.productQty,
                productId : product.productId,
                orderId : orderData.id
            })
        })
        if(paymentMethod == PaymentMethod.COD){
            await Payment.create({
                orderId : orderData.id,
                paymentMethod : paymentMethod
            })
        }else if (paymentMethod == PaymentMethod.Khalti){
            // Khalti logic
        }else{
            // esewa logic
        }
        res.status(200).json({
            message : "Order created successfully"
        })
    }
}

export default new OrderController()