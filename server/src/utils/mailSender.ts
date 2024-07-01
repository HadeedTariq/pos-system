import * as nodeMailer from 'nodemailer';
import * as path from 'path';
import * as hbs from 'nodemailer-express-handlebars';

export const mailSender = async (email: string, otp: string) => {
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

    transporter.use(
      'compile',
      hbs(handlebarOptions as hbs.NodemailerExpressHandlebarsOptions),
    );

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.log(err);
  }
};
