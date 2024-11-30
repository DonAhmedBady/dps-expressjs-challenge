import { Router } from 'express';
import { runQuery } from '../services/db.service';

const router = Router();

router.get('/', async (req, res) => {
  const reports = await runQuery('SELECT * FROM reports');
  res.json(reports);
});

router.get('/special', async (req, res) => {
  const reports = await runQuery(`
    SELECT * FROM reports
    WHERE REGEXP_LIKE(content, '\\b(\\w+)\\b.*\\b\\1\\b.*\\b\\1\\b')
  `);
  res.json(reports);
});

// Additional routes for create/update/delete
export default router;
