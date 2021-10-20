/** @format */

import { Request, Response } from 'express';
import chat from '../models/chat';

export default async function create_chat(req: Request, res: Response) {
	try {
		const newChat: any = await chat.create(req.body);
		return res.json({
			message: 'chat has been created',
			success: true,
			data: newChat,
		});
	} catch (err) {
		console.log(err);

		return res.json({
			message: 'internal server error',
			success: false,
			data: null,
		});
	}
}
