import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    if (accessToken.token) {
      console.log("Access Token:", accessToken.token);
    } else {
      console.error(
        "Failed to obtain access token:",
        accessToken.res?.data ?? "No response data"
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as any);

    return transporter;
  } catch (error) {
    console.error("Failed to create transporter:", error);
  }
}

async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  const transporter = await createTransporter(); // Reuse the function here
  const mailOptions = {
    from: `Your App <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };
  if (!transporter) {
    console.error("Transporter is not defined");
    return;
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export { sendEmail, createTransporter };
