import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// connect database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //you can check if user, email, or password is emty or not
    if(!username || !email || !password){
      return NextResponse.json({ message: "Must provide username, email and password" },
      {status: 400});
    }

    // check if the user already exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already Exist" },
      {status: 400});
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // save to database
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    const savedUser = await newUser.save();
    console.log(savedUser)

    //send verification email
    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    // send response
    return NextResponse.json({
        message: "User Created Successfully",
        success: true,
        savedUser
    })

  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
