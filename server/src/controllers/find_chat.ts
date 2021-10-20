/** @format */

import { Request, Response } from 'express';
import chat from '../models/chat';

export default async function find_chat(req: Request, res: Response) {
	try {
		const c = await chat.findOne({ _id: req.params.id });
		return res.json({
			message: '',
			success: true,
			data: c,
		});
	} catch (err) {
		return res.json({
			message: 'an error has occured',
			success: false,
			data: null,
		});
	}
}
