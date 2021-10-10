/** @format */

import create_chat from './controllers/create_chat';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/create', create_chat);

export default router;
