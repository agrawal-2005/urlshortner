import express from 'express';
import URL from '../models/url.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allUrls = await URL.find({});
        res.render("home", { urls: allUrls });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

export default router;