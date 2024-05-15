import express from 'express'
const app=express()
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDatabase } from './config/dbConnect.js'
import errormiddleware from './middlewares/error.js'

// handled uncaught exceptions

process.on("uncaughtException",(err)=>{
    console.log(`ERROR ${err}`)
    console.log("Shutting down due to uncaught exception")
    process.exit(1)
})
dotenv.config({path:"backend/config/config.env"})

// connecting to database
connectDatabase()

app.use(express.json({limit:"10mb"}))
app.use(cookieParser())


//Import all routes
import productRoutes from './routes/product.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'
import paymentRoutes from './routes/payment.js'

app.use('/api/v1',productRoutes)
app.use('/api/v1',authRoutes)
app.use('/api/v1',orderRoutes)
app.use('/api/v1',paymentRoutes)
// Using error middleware

app.use(errormiddleware)


const server=app.listen(4000,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} IN ${process.env.NODE_ENV} MODE `)
})

//handled unhandled promise rejection

process.on("unhandledRejection",(err)=>{
    console.log(`ERROR ${err}`)
    console.log("Shutting down server due to unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})