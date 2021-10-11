/** @format */

import express, { Router } from 'express';

import create_chat from './controllers/create_chat';
import find_chats from './controllers/find_chats';
import search_users from './controllers/search_users';

const router: Router = express.Router();

router.post('/create', create_chat);
router.get('/chats/:id', find_chats);
router.post('/users/search', search_users);

export default router;
