/** @format */

import express, { Router } from 'express';

import create_chat from './controllers/create_chat';
import find_chats from './controllers/find_chats';
import find_chat from './controllers/find_chat';
import search_users from './controllers/search_users';
import add_user from './controllers/add_user';

const router: Router = express.Router();

router.post('/create', create_chat);
router.get('/chats/:id', find_chats);
router.get('/find/:id', find_chat);
router.post('/add-user', add_user);
router.post('/users/search', search_users);

export default router;
