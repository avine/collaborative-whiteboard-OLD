import express from 'express';
import { getDefaultDb } from '../db/db-params';

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

router.use('/db/users', async (req, res) => {
  const db = await getDefaultDb();
  db.collection('users')
    .find({})
    .toArray((error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    });
});

const getUserName = () =>
  ['Stéphane', 'Jean-Noel', 'Eric'][Math.round(Math.random() * 2)];

router.use('/db/user/add', async (req, res) => {
  const db = await getDefaultDb();
  db.collection('users').insertOne({ name: getUserName() }, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result.ops);
  });
});

export default router;
