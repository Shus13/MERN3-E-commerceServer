import express from 'express'
import './database/connection.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'

const app = express()

app.use(express.json());

app.use("/api/auth", userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)

export default app