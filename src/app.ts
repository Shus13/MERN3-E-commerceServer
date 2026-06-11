import express from 'express'
import './database/connection.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'

const app = express()

app.use(express.json());

app.use("/api/auth", userRoute)
app.use("/api/category",categoryRoute)

export default app