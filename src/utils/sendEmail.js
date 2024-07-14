import nodemailer from 'nodemailer'
import { htmlTemplate } from './htmlTemplate.js';

export const sendEmail = async (token,email)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "omerbag2002@gmail.com",
          pass: "mgzsycjhskkndqsy",
        },
      });
    
      const info = await transporter.sendMail({
        from: '"Task app" <omerbag2002@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verify your email", // Subject line
        text: "Please Verify your email", // plain text body
        html: htmlTemplate(token), // html body
      });
} 
