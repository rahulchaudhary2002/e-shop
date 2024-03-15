import User from "../models/UserModel.js"
import Token from "../models/TokenModel.js"
import jwt from "jsonwebtoken"
import sendMail from "../utils/SendMail.js"
import crypto from "crypto"
import calculateExpirationTime from "../utils/CalculateExpirationTime.js"

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        return res.status(500).json({ status: 500, error: "Something went wrong while generating referesh and access token" })
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    const role = req.header("role")

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(409).json({ status: 409, error: "User with email already exists" })
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json({ status: 500, error: "Something went wrong while registering the user" })
    }

    const expirationTime = calculateExpirationTime(process.env.VERIFICATION_TOKEN_EXPIRY);

    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString('hex'),
        expirationTime
    })

    const url = `localhost:5000/api/verify/${token.token}`

    const data = {
        subject: "Email Verification",
        title: "Verify Email Address",
        body: "Click the button below to verify your email address.",
        template: "verify",
        user: createdUser,
        url
    }

    sendMail(data)

    return res.status(200).json({ status: 200, data: createdUser, message: "User registered Successfully" })
}

const verify = async (req, res) => {
    let token = await Token.findOne({ token: req.params.token });

    if (!token) {
        return res.status(400).json({ status: 400, error: "Invalid token or token may have expired." })
    }

    let user = await User.findById(token.user)

    if (user.isVerified) {
        return res.status(400).json({ status: 400, error: "User already verified. Login to continue" })
    }

    user.isVerified = true
    user = await user.save()

    if (!user) {
        return res.status(400).json({ status: 400, error: "Failed to verify. Try again later." })
    }

    return res.status(200).json({ status: 200, message: "User verified successfully" });
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ status: 404, error: "User does not exist" })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!user.isActive) {
        return res.status(401).json({ status: 401, error: "User is not activated" })
    }

    if (!user.isVerified) {
        return res.status(401).json({ status: 401, error: "User is not verifed" })
    }

    if (!isPasswordValid) {
        return res.status(401).json({ status: 401, error: "Invalid user credentials" })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            status: 200,
            data: { loggedInUser, accessToken, refreshToken },
            message: "User logged In Successfully"
        })
}

const logout = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ status: 200, message: "User logged Out" })
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).json({ status: 401, error: "Unauthorized request" })
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).json({ status: 401, error: "Invalid refresh token" })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ status: 401, error: "Refresh token is expired" })
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                status: 200,
                data: { accessToken, refreshToken: newRefreshToken },
                message: "Access token refreshed"
            })
    } catch (error) {
        return res.status(401).json({ status: 401, error: error?.message || "Invalid refresh token" })
    }
}

const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        return res.status(400).json({ status: 400, error: "Invalid old password" })
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res.status(200).json({ status: 200, message: "Password changed successfully" })
}

const getCurrentUser = async (req, res) => {
    return res.status(200).json({ status: 200, data: req.user, message: "User fetched successfully" })
}

export {
    register,
    verify,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
}