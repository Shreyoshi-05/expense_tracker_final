import { giveRes } from "../err/err.js";
import { passInfo } from "../table/pass.js";
import { User } from "../table/userTable.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const forgetPassController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return giveRes(req, res, 300, "user not found", null, false);
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const request = await passInfo.create({
      userId: user.id,
      expiresAt,
    });

    const token = request.id;

    const resetUrl = `http://localhost:3000/password/resetPassword/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of recipients
      subject: "Hello", // subject line
      text: "Reset Password", // plain text body
      html: `<h3>Click below to reset password</h3>
             <a href="${resetUrl}">${resetUrl}</a>`, // HTML body
    });

    return giveRes(req, res, 200, "reset link sent", null, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const getResetForm = async (req, res) => {
  try {
    const { token } = req.params;
    const request = await passInfo.findOne({
      where: { id: token, isActive: true },
    });

    if (!request) {
      return res.send("<h2>Invalid or expired link</h2>");
    }

    if (new Date() > request.expiresAt) {
      return res.send("<h2>Link expired</h2>");
    }

    return res.send(`
      <form action="/password/reset" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <input type="password" name="password" placeholder="Enter new password" />
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};

export const resetPassWord = async (req, res) => {
  try {
    const { token, password } = req.body;
    const request = await passInfo.findOne({
      where: { id: token, isActive: true },
    });

    if (!request) {
      return giveRes(req, res, 300, "Invalid request", null, false);
    }
    const hashPass = await bcrypt.hash(password, 10);
    await User.update(
      { password: hashPass },
      { where: { id: request.userId } },
    );

    await passInfo.update({ isActive: false }, { where: { id: token } });

    return giveRes(req, res, 200, "password updated successfully", null, true);
  } catch (error) {
    return giveRes(req, res, 500, error.message, null, false);
  }
};
