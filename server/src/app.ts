/** @format */

import { app, server, wss } from './utils/io';
import express, { Request, Response } from 'express';
import cors from 'cors';
import connect from './utils/database';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve('./src/.env'), // remove this line in production
	debug: true, // remove this line in production
});
connect();

const PORT = process.env.PORT || 8080;

import router from './router';
import io from './io/router';

app.use(express.json());
app.use(cors());
app.use('/public', express.static('./public'));
app.use('/uploads', express.static('./uploads'));
app.use('/chat', router);
wss.on('connection', io);

app.get('*', (req: Request, res: Response) => {
	return res.sendFile('./index.html', { root: './public' });
});

server.listen(PORT, () => {
	console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
