import express from 'express'
import './database/connection.js'
import userRoute from './routes/userRoute.js'

const app = express()

app.use(express.json());

app.use("/api/auth", userRoute)

export default app