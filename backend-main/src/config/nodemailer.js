import nodemailer from "nodemailer";
import "dotenv/config"
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    debug: true
});

//verification
transporter.verify(function(error, success){
    if (error) {
        console.log('SMTP error:'+error);
    } else {
        console.log('SMTP service is ready to send emails');
    }
})