import { Schema, model } from "mongoose"

const { ObjectId } = Schema

const orderSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    number_of_product: {
        type: Number,
        required: true,
        min: 1
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default model("Order", orderSchema)