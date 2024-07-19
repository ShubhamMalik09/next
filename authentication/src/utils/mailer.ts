import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcrypt from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
        const hashedToken = await  bcrypt.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } 
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        } 

        const transporter = nodemailer.createTransport({
            host:"smtp.forwardmail.net",
            port:465,
            secure:true,
            auth:{
                user:"",
                pass:"",
            },
        });

        const mailOptions ={
            from:"hitesh@hitesh.ai",
            to:email,
            subject: emailType=== 'VERIFY' ? "Verify your email" : "Rest your password",
            html:`<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==='VERIFY' ? "verify your email":"reset your password"}
            or copy and paste the link below n your browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse
    } catch(error:any){
        throw new Error(error.message)
    }
}