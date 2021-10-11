/** @format */

import { Request, Response } from 'express';
import axios from 'axios';

export default async function search_users(req: Request, res: Response) {
	const options = {
		headers: {
			Authorization: 'Bearer ' + process.env.MGMT_TOKEN,
		},
	};

	const url = [
		'https://dustiastheguy.eu.auth0.com/api/v2/users',
		'?q=name:' + req.body.value,
		'&search_engine=v3',
	].join('');

	const response = await axios.get(url, options);

	let data: any[] = response.data;

	return res.json({
		message: '',
		success: true,
		data: data.map((u: any) => {
			return {
				email: u.email,
				name: u.name,
				sub: u.user_id,
				picture: u.picture,
				given_name: u.given_name,
				family_name: u.family_name,
				nickname: u.nickname,
			};
		}),
	});
}
