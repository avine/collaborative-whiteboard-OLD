import express from 'express';

import checkBearerToken from '../../core/common/check-bearer-token';
import addWhiteboardHandler from './handlers/add';
import getWhiteboardHandler from './handlers/get';
import setWhiteboardHandler from './handlers/set';
import updateWhiteboardHandler from './handlers/update';

const router = express.Router();

router.put('/whiteboard', checkBearerToken, addWhiteboardHandler);
router.get('/whiteboard/:whiteboardId', checkBearerToken, getWhiteboardHandler);
router.put('/whiteboard/:whiteboardId', checkBearerToken, setWhiteboardHandler);
router.patch(
  '/whiteboard/:whiteboardId',
  checkBearerToken,
  updateWhiteboardHandler
);

export default router;
