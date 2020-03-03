import express from 'express';
import { resolve } from 'path';

import ROOT_PATH from '../root-path';

const router = express.Router();

const staticPath = resolve(ROOT_PATH, 'static');

router.use('/', express.static(staticPath));

export default router;
