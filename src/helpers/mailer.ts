import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

//i use amt email to log in mailtrap
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token. make sure the userId is a string
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    // bcrypt hash token can contain special character
    // search engines will generally change special characters in URLs
    // so we cannot bcrypt token to send as query

    // creating my own random number to add to userid making encryption my way(not safe)
    const min = 1;
    const max = 1000;
    const randomNumber1 = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();
    const randomNumber2 = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();
    const randomNumber3 = (
      Math.floor(Math.random() * (max - min + 1)) + min
    ).toString();

    const hashedToken =
      randomNumber1 + randomNumber2 + userId.toString() + randomNumber3;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, //ms = 1h to verify
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // find this code in mailtrap, nodemailer option
    var transport = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST!,
      port: parseInt(process.env.MAIL_TRAP_PORT!),
      auth: {
        user: process.env.MAIL_TRAP_USER!,
        pass: process.env.MAIL_TRAP_PASS!,
      },
    });

    const mailOptions = {
      from: "amt002600@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      } Or if the link don't work copy this url and paste in search: ${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}</p>`,
    };

    //sending mail
    const mailResponse = await transport.sendMail(mailOptions);
    //you can return it if you wish
    return mailResponse;
  } catch (error: any) {
    throw new Error("Failed to send email  " + error?.message);
  }
};
