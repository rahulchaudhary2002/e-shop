import { Schema, model } from "mongoose"

const { ObjectId } = Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    vendor: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

export default model("Product", productSchema)