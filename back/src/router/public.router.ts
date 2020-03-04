import express from 'express';
import { resolve } from 'path';

import ROOT_PATH from '../root-path';

const router = express.Router();

const publicPath = resolve(ROOT_PATH, 'public');

router.use('/', express.static(publicPath));

export default router;
