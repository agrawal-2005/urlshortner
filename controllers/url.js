import { nanoid } from 'nanoid';
import URL from '../models/url.js';

export const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortID = nanoid(8);
    // console.log('Generated ShortID:', shortID);

    try {
        const newUrl = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user ? req.user._id : null
        });

        // console.log('New URL Created:', newUrl);
        return res.render('home', { id: shortID });
    } catch (err) {
        console.error('Error Creating Short URL:', err);
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