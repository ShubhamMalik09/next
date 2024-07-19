import {connect} from "@/dbConfig/dbConfig"
import {NextResponse,NextRequest} from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function POST(request:NextRequest) {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id:userId}).select("-password");

    if(!user){
        return NextResponse.json({
            error:"user not found",
        },{status:400})
    };

    return NextResponse.json({
        message:"User found",
        data:user
    })

}