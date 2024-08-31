import User from "../models/user.js";
import {v4 as uuidv4} from 'uuid'
import { setUser } from "../service/auth.js";

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    return res.redirect("/login"); // Redirect to login after signup
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { error: "Signup failed, please try again." });
  }
};


export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};
