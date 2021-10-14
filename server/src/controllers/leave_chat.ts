/** @format */

import { Request, Response } from 'express';
import { IMessage, IRoom } from 'types';
import { rooms } from '../io/store';
import broadcast from '../io/broadcast';
import chat from '../models/chat';

export default async function leave_chat(req: Request, res: Response) {
	console.log(req.body);

	try {
		const room = rooms.find((room: IRoom) => room.id === req.body.room);
		if (!room)
			return res.json({
				message: 'internal server error',
				success: false,
				data: null,
			});

		const message: IMessage = {
			message: `${req.body.user.nickname} has been removed`,
			createdAt: new Date(),
			user: req.body.user,
			type: 'occurance',
			reason: 'left',
			room: req.body.room,
		};

		let ch = await chat.findOne({ _id: req.body.room });
		ch.participants.splice(
			ch.participants.findIndex((u: any) => u.sub === req.body.user.sub),
			1
		);
		await ch.save();
		broadcast(room, message);

		return res.json({
			message: '',
			success: true,
			data: null,
		});
	} catch (err) {
		return res.json({
			message: 'internal server error',
			success: false,
			data: null,
		});
	}
}
