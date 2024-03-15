import express from 'express'
import 'dotenv/config'
import './db/connection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoute from './routes/AuthRoute.js'

const app = express()
const port = process.env.PORT

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api', AuthRoute)

app.listen(port, ()=>{
    console.log(`server started successful at code ${port}`)
})