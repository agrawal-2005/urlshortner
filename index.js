import express from "express";
import URL from "./models/url.js";
import connectToMongoDB from "./connect.js"; // Use ES module syntax for imports
import urlRoute from "./routes/url.js"; // Use ES module syntax for imports

const app = express();
const PORT = 8081;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now()
        }
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("Server is listening at PORT:", PORT));
