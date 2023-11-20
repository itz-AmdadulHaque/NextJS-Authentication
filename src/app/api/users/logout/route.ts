import { NextResponse } from "next/server";

export async function GET() {
  // delete the token cookie
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    // delete the token
    // cookies.delete("token") wont work on versel due to
    // preventing cross-site-request-forgery
    response.cookies.set("token", "");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
