"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const nodeMailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const mailSender = async (email, otp) => {
    try {
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('src/views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('src/views/'),
        };
        const mailOptions = {
            from: 'hadeedtariq12@gmail.com',
            to: email,
            template: 'email',
            subject: 'Verification Email',
            context: {
                companyName: 'QuickSell',
                email: email,
                otp: otp,
                year: new Date().getFullYear(),
            },
        };
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        transporter.use('compile', hbs(handlebarOptions));
        const info = await transporter.sendMail(mailOptions);
        return info;
    }
    catch (err) {
        console.log(err);
    }
};
exports.mailSender = mailSender;
//# sourceMappingURL=mailSender.js.map