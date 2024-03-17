import express from 'express'
import 'dotenv/config'
import './db/connection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoute from './routes/AuthRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'));
app.use(cookieParser())

app.use('/api', AuthRoute)
app.use('/api', CategoryRoute)

app.listen(port, ()=>{
    console.log(`server started successful at code ${port}`)
})