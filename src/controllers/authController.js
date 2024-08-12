import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUserByEmail, getUserByPhone } from "../services/userService.js";

export const login = async (req, res) => {
  if (!req.body.phone || req.body.phone === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide pnone number",
    });
  }
  if (!req.body.password || req.body.password === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide password",
    });
  }
  // console.log(req.body.email)
  let user = await getUserByPhone(req.body.phone);
  // console.log(user)
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number or password",
    });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid phone number or password",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token: generateToken(user.id),
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      role: user.role,
      notify: user.notify,
    },
  });
};



// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
