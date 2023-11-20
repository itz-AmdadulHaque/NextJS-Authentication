import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/config/dbConfig";

// database connection
connect();

export async function GET(request: NextRequest) {
  try {
    //see in helpers
    const userID = await getDataFromToken(request);
    // find user and get the user data without the password
    const user = await User.findById(userID).select("-password");
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
