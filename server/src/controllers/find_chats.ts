/** @format */

import { Request, Response } from 'express';
import chat from '../models/chat';

export default async function find_chats(req: Request, res: Response) {
	try {
		console.log(req.params.id);
		const chats = await chat.findMany({
			'participants.sub': req.params.id,
		});
		return res.json({
			message: '',
			success: true,
			data: chats,
		});
	} catch (err) {
		return res.json({
			message: 'internal server error',
			success: false,
			data: null,
		});
	}
}
