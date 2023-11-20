import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/config/dbConfig";
import { sendEmail } from "@/helpers/mailer";

//connect database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email)

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist", success: false },
        {
          status: 400,
        }
      );
    }
    // sent email to reset password
    sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "email sent successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
