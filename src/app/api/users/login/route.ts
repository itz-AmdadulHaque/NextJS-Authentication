import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// connect database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //you can check if user, email, or password is emty or not

    // check if the user already exist
    const user = await User.findOne({ email });
    //if user not exist
    if (!user) {
      return NextResponse.json(
        { message: "You don't have an account, signup first" },
        { status: 400 }
      );
    }

    //if user did not verify the email
    if (!user?.isVarified) {
      return NextResponse.json(
        { message: "Please verify your email" },
        { status: 400 }
      );
    }

    //check if the password is correct
    const validPassword = await bcryptjs.compare(password, user?.password);

    if (!validPassword) {
      // send response
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    // token data
    const tokenData = {
      id: user._id,
      username: user?.username,
      email: user?.email,
    };

    // create jwt token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    //create cookie. this response object can acess user cookie
    // you can set or get the cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
