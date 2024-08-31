import express from "express";
import URL from "../models/url.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const allUrls = await URL.find({ createdBy: req.user?._id });
    res.render("home", { urls: allUrls });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
