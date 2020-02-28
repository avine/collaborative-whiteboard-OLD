import express from 'express';
import multer from 'multer';

import signInHandler from './handlers/sign-in';
import signUpHandler from './handlers/sign-up';

const upload = multer();

const router = express.Router();

router.post('/user/signup', upload.none(), signUpHandler);
router.post('/user/signin', upload.none(), signInHandler);

export default router;
