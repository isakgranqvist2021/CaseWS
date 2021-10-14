/** @format */

import { Request, Response } from 'express';
import { IMessage, IRoom } from '../types';
import { rooms } from '../io/store';
import broadcast from '../io/broadcast';
import chat from '../models/chat';

export default async function upload_file(req: Request, res: Response) {
	try {
		let files: any = req.files;
		let user: any = JSON.parse(req.body.user);

		if (!files)
			return res.json({
				message: 'no files have been uploaded',
				success: false,
				data: null,
			});

		const message: IMessage = {
			message: `${user.nickname} has uploaded ${files.length} file${
				files.length > 1 ? 's' : ''
			}`,
			createdAt: new Date(),
			user: user,
			type: 'file',
			files: [],
		};

		files.forEach((file: any) => {
			const host = `${process.env.HOST}${
				process.env.NODE_ENV === 'development'
					? ':' + process.env.PORT
					: ''
			}/uploads`;

			if (file.mimetype.includes('image')) {
				message.files.push({
					fileType: 'image',
					filename: file.filename,
					src: `${host}/${file.filename}`,
				});
			} else {
				message.files.push({
					fileType: 'file',
					filename: file.filename,
					src: `${host}/${file.filename}`,
				});
			}
		});

		let room = rooms.find((room: IRoom) => room.id === req.body.room);
		if (room) {
			await chat.updateOne(
				{ _id: req.body.room },
				{
					$push: { messages: message },
				}
			);

			broadcast(room, message);
		}

		return res.json({
			message: 'files have been uploaded',
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
