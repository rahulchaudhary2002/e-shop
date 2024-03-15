import { connect } from "mongoose"

connect(process.env.DATABASE)
.then(() => {
    console.log("Database connected successfully")
})
.catch((error) => {
    console.log(error)
})