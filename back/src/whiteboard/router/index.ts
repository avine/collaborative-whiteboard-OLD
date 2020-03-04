import express from 'express';

import checkBearerToken from '../../core/common/check-bearer-token';
import addWhiteboardHandler from './handlers/add';
import getWhiteboardHandler from './handlers/get';

const router = express.Router();

router.put('/whiteboard', checkBearerToken, addWhiteboardHandler);
router.get('/whiteboard/:whiteboardId', checkBearerToken, getWhiteboardHandler);

export default router;
