import { Router, Request, Response } from 'express';
import { handleScholarCitations } from './handlers/scholarCitations';

const router = Router();

/**
 * POST /api/scholar-citations
 * 
 * Fetch citation count for a given paper/thesis title
 * 
 * Request:
 *   - method: POST
 *   - body: { title: string }
 * 
 * Response:
 *   - citations: number (citation count)
 *   - title: string (normalized title)
 *   - found: boolean (whether paper was found)
 * 
 * Example:
 *   POST /api/scholar-citations
 *   Body: { "title": "Crisis Response through Social Cues Analysis" }
 *   Response: { "citations": 0, "title": "Crisis Response through Social Cues Analysis", "found": false }
 */
router.post('/scholar-citations', handleScholarCitations);

/**
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
