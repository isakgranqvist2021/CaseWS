/** @format */

import { Request, Response } from 'express';
import { IMessage, IRoom } from 'types';
import { rooms } from '../io/store';
import broadcast from '../io/broadcast';
import chat from '../models/chat';

export default async function leave_chat(req: Request, res: Response) {
	if (!req.body.room)
		return res.json({
			message: 'missing required data [room]',
			success: false,
			data: null,
		});

	if (!req.body.user)
		return res.json({
			message: 'missing required data [user]',
			success: false,
			data: null,
		});

	if (!req.body.user.sub)
		return res.json({
			message: 'missing required data [user.sub]',
			success: false,
			data: null,
		});

	if (!req.body.user.nickname)
		return res.json({
			message: 'missing required data [user.nickname]',
			success: false,
			data: null,
		});

	try {
		const update = await chat.findOne({ _id: req.body.room });

		const part = update.participants;
		const index = part.findIndex((u: any) => u.sub === req.body.user.sub);
		part.splice(index, 1);

		if (part.length === 0) {
			await chat.deleteOne({ _id: req.body.room });
		} else {
			await update.save();
		}

		const message: IMessage = {
			message: `${req.body.user.nickname} has been removed`,
			createdAt: new Date(),
			user: req.body.user,
			type: 'occurance',
			reason: 'left',
			room: req.body.room,
		};

		const room = rooms.find((room: IRoom) => room.id === req.body.room);
		if (room && part > 0) broadcast(room, message);

		return res.json({
			message: "you've left the room",
			success: true,
			data: message,
		});
	} catch (err) {
		return res.json({
			message: 'internal server error',
			success: false,
			data: null,
		});
	}
}
