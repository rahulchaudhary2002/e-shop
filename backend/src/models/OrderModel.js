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
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'packing', 'delivered', 'cancelled'],
    }
}, { timestamps: true })

export default model("Order", orderSchema)