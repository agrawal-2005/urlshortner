import { nanoid } from 'nanoid';
import URL from '../models/url.js';

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortID = nanoid(8);
    try {
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: []
        });

        // Render the home page with the generated shortID
        return res.render('home', { id: shortID });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to create short URL' });
    }
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const result = await URL.findOne({ shortId });
        if (!result) {
            return res.status(404).json({ error: 'URL not found' });
        }
        return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch analytics' });
    }
}