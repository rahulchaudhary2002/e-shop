import sendMail from "../utils/SendMail.js";

const verificationMail = (user, token) => {
    if (user.role === 'customer') {
        var url = `${process.env.APP_URL}/verify/${token.token}`
    }
    else {
        var url = `${process.env.APP_URL}/administrator/verify/${token.token}`
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
        subject: "Verify Email Address",
        template: "verify",
        context,
    };

    sendMail(mailOptions)
}

export default verificationMail