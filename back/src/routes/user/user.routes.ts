import express from 'express';
import multer from 'multer';

import signInHandler from './handlers/sign-in';
import signUpHandler from './handlers/sign-up';
import tokenHandler from './handlers/token';

const upload = multer();

const router = express.Router();

router.post('/user/signup', upload.none(), signUpHandler);
router.post('/user/signin', upload.none(), signInHandler);
router.post('/user/token', upload.none(), tokenHandler);

export default router;
