import express from "express";
import URL from "./models/url.js";
import path from "path";
import staticRouter from "./routes/staticRouter.js";
import connectToMongoDB from "./connect.js";
import urlRoute from "./routes/url.js";

const app = express();
const PORT = 8081;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRouter); // Adjusted route to '/' for staticRouter

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    
    if (!entry) {
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log("Server is listening at PORT:", PORT));