import verificationMail from '../mails/verificationMail.js';
import Token from '../models/TokenModel.js';
import User from '../models/UserModel.js'
import calculateExpirationTime from "../utils/CalculateExpirationTime.js"
import crypto from "crypto"

const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10
    const skip = (page - 1) * perPage;

    const users = await User.find().skip(skip).limit(perPage).select(
        "-password -refreshToken"
    )
    const totalRecords = await User.countDocuments()

    return res.status(200).json({
        status: 200,
        data: { users, totalRecords, page, perPage }
    })
}

const createUser = async (req, res) => {
    const { name, email, role, isActive } = req.body

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(409).json({ status: 409, error: "User with email already exists" })
    }

    const user = await User.create({
        name,
        email,
        password: '123456789',
        role,
        isActive
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json({ status: 500, error: "Something went wrong while creating user" })
    }

    const expirationTime = calculateExpirationTime(process.env.VERIFICATION_TOKEN_EXPIRY);

    let token = await Token.create({
        user: user._id,
        type: 'verify',
        token: crypto.randomBytes(32).toString('hex'),
        expirationTime
    })

    verificationMail(user, token)

    return res.status(200).json({ status: 200, data: { user: createdUser }, message: "User created successfully. Verification email has been sent." })
}

const updateUser = async (req, res) => {
    const UserId = req.params.id;
    const { name, role, isActive } = req.body

    let existingUser = await User.findById(UserId);

    if (!existingUser) {
        return res.status(404).json({ status: 404, error: "User not found" });
    }

    existingUser.name = name
    existingUser.role = role
    existingUser.isActive = isActive

    try {
        const updatedUser = await existingUser.save();

        return res.status(200).json({
            status: 200,
            data: { user: updatedUser },
            message: "User updated successfully"
        })
    } catch (error) {
        return res.status(500).json({ status: 500, error: "Failed to update user" });
    }
}

export {
    getUsers,
    createUser,
    updateUser
}