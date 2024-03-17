import { Schema, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default model("Category", categorySchema)