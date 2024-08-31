import express from "express";
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({});
    res.render("home", { urls: allUrls });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const Urls = await URL.find({ createdBy: req.user?._id });
    res.render("home", { urls: Urls });
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
