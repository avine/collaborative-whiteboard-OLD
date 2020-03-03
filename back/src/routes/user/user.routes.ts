import express from 'express';
import multer from 'multer';

import checkBearerToken from '../../core/common/check-bearer-token';
import signInHandler from './handlers/sign-in';
import signUpHandler from './handlers/sign-up';
import tokenHandler from './handlers/token';

const upload = multer();

const router = express.Router();

router.post('/user/signup', upload.none(), signUpHandler);
router.post('/user/signin', upload.none(), signInHandler);
router.get('/user/token', checkBearerToken, tokenHandler);

export default router;
