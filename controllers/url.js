import { nanoid } from 'nanoid';
import URL from '../models/url.js';  // Importing the URL model

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.json({ id: shortID });
}

export const handleGetAnalytics = async(req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.visitHistory.length, anlytics: result.visitHistory })
}