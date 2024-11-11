import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/Users";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { sendEmail } from "../emailService";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    console.log("Received email:", email);
    const user = await User.findOne({ email });
    console.log("User found:", user);
    const generateHashedPassword = async (plainPassword: string) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      console.log("Hashed Password:", hashedPassword);
    };

    generateHashedPassword("28.09.2003");
    if (!user) return res.status(400).json({ message: "User not found" });

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
    console.log("GOOGLE_REFRESH_TOKEN:", process.env.GOOGLE_REFRESH_TOKEN);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const twoFactorCode = crypto.randomInt(100000, 999999).toString();
    const twoFactorExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.twoFactorCode = twoFactorCode;
    user.twoFactorExpires = twoFactorExpires;
    await user.save();

    await sendEmail(
      email,
      "Your Two-Factor Authentication Code",
      `Your verification code is: ${twoFactorCode}`
    );

    res.status(200).json({ message: "2FA code sent to email" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/verify-2fa", async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (
      user.twoFactorCode !== code ||
      !user.twoFactorExpires ||
      user.twoFactorExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.twoFactorCode = null;
    user.twoFactorExpires = null;
    await user.save();

    const token = "dummy-jwt-token";
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
