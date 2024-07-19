import User from "@/models/userModel"
import {NextResponse,NextRequest} from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/utils/mailer";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({
                error:"invalid token"
            },{
                status:400
            })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        console.log('user ',user );
        await user.save();
        return NextResponse.json({
            message:"Email verified sucessfuly",success:true
        },{
            status:200
        })
    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
    }
}