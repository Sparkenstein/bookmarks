import { Router } from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/index.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { email, name, password, role } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await argon2.hash(password);

  try {
    const user = new UserModel({
      email,
      name,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch {
    return res.status(400).send("Bad request");
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
});

export default authRouter;
