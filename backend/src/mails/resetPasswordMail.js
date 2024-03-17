import sendMail from "../utils/SendMail.js";

const resetPasswordMail = (user, token) => {
    if (user.role === 'customer') {
        var url = `${process.env.APP_URL}/reset-password/${token.token}`
    }
    else {
        var url = `${process.env.APP_URL}/administrator/reset-password/${token.token}`
    }
    
    const { name, email } = user

    const context = {
        app_name: process.env.APP_NAME,
        app_url: process.env.APP_URL,
        url,
        user: { name },
        year: new Date().getFullYear()
    };

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Reset Password",
        template: "reset_password",
        context,
    };

    sendMail(mailOptions)
}

export default resetPasswordMail