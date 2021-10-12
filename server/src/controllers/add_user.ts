/** @format */

import { Request, Response } from 'express';
import chat from '../models/chat';

export default async function add_user(req: Request, res: Response) {
	try {
		const c = await chat.findOne({ _id: req.body.room });

		if (!c)
			return res.json({
				message: 'room not found',
				success: false,
				data: null,
			});

		if (c.participants.some((u: any) => u.sub === req.body.user.sub)) {
			return res.json({
				message: 'user already exists',
				success: false,
				data: null,
			});
		}

		c.participants.push(req.body.user);
		await c.save();
		return res.json({
			message: 'user added',
			success: true,
			data: null,
		});
	} catch (err) {
		return res.json({
			message: 'user already exists',
			success: false,
			data: null,
		});
	}
}
