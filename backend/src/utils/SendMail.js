import hbs from 'nodemailer-express-handlebars'
import { createTransport } from "nodemailer";
import path from 'path'

const sendMail = async (data) => {
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

    var mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: data.user.email,
        subject: data.subject,
        template: data.template,
        context: {
            app_name: process.env.APP_NAME,
            app_url: process.env.APP_URL,
            data
        },
    };

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