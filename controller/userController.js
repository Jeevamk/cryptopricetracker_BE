import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

//USer Register route
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const existingUSer = await userModel.findOne({ email });
    if (existingUSer) {
      return res.status(400).json({ message: "User already exist" });
    } else {
      const newUser = new userModel({ username, email, password });
      console.log(newUser);
      const token = jwt.sign({ email }, process.env.JWT_SECRETKEY, {
        expiresIn: "1h",
      });
      newUser.verificationToken = token;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const htmlContent = `
        <div style="text-align: center;">
        <h2>Email Verification</h2>
        <p>Please verify your email by clicking the button below:</p>
        <a href="${process.env.BASE_URL}/api/user/verify/${token}" 
        style="display: inline-block; padding: 10px 20px; font-size: 16px; 
              color: white; background-color: blue; text-decoration: none; 
              border-radius: 5px;">
            Verify Email
        </a>
       </div>`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.email,
        subject: "Email Verification",
        html: htmlContent
      };
      await newUser.save();
      await transporter.sendMail(mailOptions);

      res.status(200).json({ msg: "Verification email sent" });
    }
  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    // res.status(200).json({ msg: "Email verified" });
    res.send(`
      <html>
        <body>
          <h1>Email Verified Successfully</h1>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
