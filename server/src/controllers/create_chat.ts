/** @format */
import { Request, Response } from 'express';

export default function create_chat(req: Request, res: Response) {
	console.log(req.body);
	return res.json({ message: 'hello world' });
}
