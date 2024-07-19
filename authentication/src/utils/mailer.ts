import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcrypt from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
        const hashedToken = await  bcrypt.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {$set:
                    {
                        verifyToken:hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        } 
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {$set:
                    {
                        forgotPasswordToken:hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            )
        } 

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3569734a669c61",
              pass: "c26101d1d60262"
            }
          });

        const mailOptions ={
            from:"shubham@sam.ai",
            to:email,
            subject: emailType=== 'VERIFY' ? "Verify your email" : "Rest your password",
            html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY' ? "verify your email":"reset your password"}
            or copy and paste the link below n your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse
    } catch(error:any){
        throw new Error(error.message)
    }
}