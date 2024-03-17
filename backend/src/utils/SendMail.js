import hbs from 'nodemailer-express-handlebars'
import { createTransport } from "nodemailer";
import path from 'path'

const sendMail = async (mailOptions) => {
    var transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/emails/'),
            layoutsDir: path.resolve('./views/layouts'),
            defaultLayout: 'layout',
        },
        viewPath: path.resolve('./views/emails/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent");
            return true;
        }
    });
}

export default sendMail;