import express from 'express';
import { resolve } from 'path';

import { ROOT_PATH } from '../path';

const router = express.Router();

const basePath = resolve(ROOT_PATH, 'static');
router.use('/static', express.static(basePath));

export default router;
