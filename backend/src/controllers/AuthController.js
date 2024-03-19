import User from "../models/UserModel.js"
import Token from "../models/TokenModel.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import calculateExpirationTime from "../utils/CalculateExpirationTime.js"
import verificationMail from "../mails/verificationMail.js"
import resetPasswordMail from "../mails/resetPasswordMail.js"

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
        role,
        isActive: role == 'customer' ? true : false
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json({ status: 500, error: "Something went wrong while registering" })
    }

    const expirationTime = calculateExpirationTime(process.env.VERIFICATION_TOKEN_EXPIRY);

    let token = await Token.create({
        user: user._id,
        type: 'verify',
        token: crypto.randomBytes(32).toString('hex'),
        expirationTime
    })

    verificationMail(user, token)

    return res.status(200).json({ status: 200, data: { user: createdUser }, message: "You have registered successfully. Please verify your email before continuing." })
}

const verify = async (req, res) => {
    let token = await Token.findOne({ token: req.params.token, type: 'verify' });

    if (!token) {
        return res.status(400).json({ status: 400, error: "Invalid token or token may have expired." })
    }

    let user = await User.findById(token.user)

    if (user.isVerified) {
        return res.status(400).json({ status: 400, error: "You are already verified. Login to continue" })
    }

    user.isVerified = true
    user = await user.save()

    if (!user) {
        return res.status(400).json({ status: 400, error: "Failed to verify email address. Try again later." })
    }

    await Token.deleteOne({ token: req.params.token, type: 'verify' })

    return res.status(200).json({ status: 200, message: "You have verified your email successfully" });
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({ status: 401, error: "Credential does not match our record" })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!user.isActive) {
        return res.status(401).json({ status: 401, error: "You are not activated. Try again after a couple of hours" })
    }

    if (!user.isVerified) {
        return res.status(401).json({ status: 401, error: "You have not verifed your email address" })
    }

    if (!isPasswordValid) {
        return res.status(401).json({ status: 401, error: "Credential does not match our record" })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '1d';
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

    const accessOptions = {
        httpOnly: true,
        secure: true,
        expires: calculateExpirationTime(accessTokenExpiry)
    }

    const refreshOptions = {
        httpOnly: true,
        secure: true,
        expires: calculateExpirationTime(refreshTokenExpiry)
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessOptions)
        .cookie("refreshToken", refreshToken, refreshOptions)
        .json({
            status: 200,
            data: { loggedInUser, accessToken, refreshToken },
            message: "You have logged In Successfully"
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
        secure: true,
        expires: new Date(0)
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ status: 200, message: "You are logged Out" })
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

        const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '1d';

        const accessOptions = {
            httpOnly: true,
            secure: true,
            expires: calculateExpirationTime(accessTokenExpiry)
        }

        const accessToken = user.generateAccessToken()

        return res
            .status(200)
            .cookie("accessToken", accessToken, accessOptions)
            .json({
                status: 200,
                data: { accessToken },
                message: "Access token refreshed"
            })
    } catch (error) {
        return res.status(401).json({ status: 401, error: error?.message || "Invalid refresh token" })
    }
}

const changeCurrentPassword = async (req, res) => {
    const { old_password, new_password } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(old_password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ status: 400, error: "Password does not match with our records" })
    }

    user.password = new_password
    await user.save({ validateBeforeSave: false })

    return res.status(200).json({ status: 200, message: "Password changed successfully" })
}

const forgetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({ status: 401, error: "Credential does not match our record" })
    }

    const expirationTime = calculateExpirationTime(process.env.PASSWORD_RESET_TOKEN_EXPIRY);

    let token = await Token.create({
        user: user._id,
        type: 'reset-password',
        token: crypto.randomBytes(32).toString('hex'),
        expirationTime
    })

    resetPasswordMail(user, token)

    return res.status(200).json({ status: 200, message: "We have successfully sent password reset link to your valid email address." })
}

const checkResetPasswordToken = async (req, res) => {
    let token = await Token.findOne({ token: req.body.token, type: 'reset-password' });

    if (!token) {
        return res.status(400).json({ status: 400, error: "Invalid token or token may have expired." })
    }

    const user = await User.findById(token?.user).select("-password -refreshToken")

    if (!user) {
        return res.status(401).json({ status: 401, error: "Invalid refresh token" })
    }

    return res.status(200).json({ status: 200, data: { user }, message: "Valid token" });
}

const resetPassword = async (req, res) => {
    const { password } = req.body
    let token = await Token.findOne({ token: req.params.token, type: 'reset-password' });

    if (!token) {
        return res.status(400).json({ status: 400, error: "Invalid token or token may have expired." })
    }

    const user = await User.findById(token.user)
    user.password = password
    await user.save({ validateBeforeSave: false })
    await Token.deleteOne({ token: req.params.token, type: 'reset-password' })

    return res.status(200).json({ status: 200, message: "You have successfully reset your password." })
}

const getCurrentUser = async (req, res) => {
    return res.status(200).json({ status: 200, data: { user: req.user }, message: "User fetched successfully" })
}

export {
    register,
    verify,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    forgetPassword,
    checkResetPasswordToken,
    resetPassword,
    getCurrentUser
}