import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import adminModel from "../models/Admin.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({ message: "All fields are required" });
    }

    const existingadmin = await adminModel.findOne({ email });
    if (existingadmin) {
      res.status(201).send({
        success: false,
        message: "Already Registered! Login to continue",
      });
    }

    const hashedPassword = await hashPassword(password);
    const admin = await new adminModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration successful!",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Emall & Passord required",
      });
    }

    let admin;
    admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered, Register to Continue",
      });
    }

    const match = await comparePassword(password, admin.password);
    if (!match) {
      return res.status(201).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
      error,
    });
  }
};
