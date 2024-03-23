import express from 'express'
import 'dotenv/config'
import './db/connection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import CategoryRoute from './routes/CategoryRoute.js'
import ProductRoute from './routes/ProductRoute.js'
import CartRoute from './routes/CartRoute.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'));
app.use(cookieParser())

app.use('/api', AuthRoute)
app.use('/api', UserRoute)
app.use('/api', CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api', CartRoute)

app.listen(port, ()=>{
    console.log(`server started successful at code ${port}`)
})