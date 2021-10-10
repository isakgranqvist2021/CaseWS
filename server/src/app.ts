/** @format */

import { Server } from 'http';
import express from 'express';
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
const app = express();
const server = new Server(app);

import router from './router';

app.use(express.json());
app.use(cors());
app.use('/chat', router);

server.listen(PORT, () => {
	console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
