import express from 'express';

import { getDefaultDb } from '../core/db';

const router = express.Router();

router.get('/db/stats', async (req, res, next) => {
  try {
    const db = await getDefaultDb();
    const stats = await db.stats();
    res.send(stats);
  } catch (err) {
    next(err);
  }
});

export default router;
