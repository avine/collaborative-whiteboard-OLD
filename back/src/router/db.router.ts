import express from 'express';
import { getDefaultDb } from '../core/db/db-params';

const router = express.Router();

router.get('/db/ping', async (req, res, next) => {
  try {
    const db = await getDefaultDb();
    const stats = await db.stats();
    res.status(200).send(stats);
  } catch (err) {
    next(err);
  }
});

export default router;
