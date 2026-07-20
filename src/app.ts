import express from 'express'
import './database/connection.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import cartRoute from './routes/cartRoute.js'

const app = express()

app.use(express.json());

app.use("/api/auth", userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/order", orderRoute)
app.use("/api/cart", cartRoute)

export default app