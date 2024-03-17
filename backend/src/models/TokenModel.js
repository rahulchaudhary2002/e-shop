import { Schema, model } from 'mongoose'
const { ObjectId } = Schema

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    expirationTime: {
        type: Date,
        required: true
    }
})

TokenSchema.index({ "expirationTime": 1 }, { expireAfterSeconds: 0 });

export default model("Token", TokenSchema)