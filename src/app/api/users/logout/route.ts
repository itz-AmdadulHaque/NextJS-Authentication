import { NextResponse } from "next/server";

export async function GET(){
    // delete the token cookie
    try{
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        })
        // delete the token
        response.cookies.delete("token")
        return response;

    }catch(error: any){
        return NextResponse.json({error: error?.message}, {status: 500})
    }
}