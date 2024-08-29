import express from 'express';
import { handleGenerateNewShortURL, handleGetAnalytics } from '../controllers/url.js';  // Use ES module syntax for imports

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics)

export default router;  // Use ES module syntax for exports