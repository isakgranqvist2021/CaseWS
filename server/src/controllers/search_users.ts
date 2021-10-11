/** @format */

import { Request, Response } from 'express';
import fetch from 'node-fetch';

export default async function search_users(req: Request, res: Response) {
	const url = [
		'https://dustiastheguy.eu.auth0.com/api/v2/users',
		'?q=isakwebdev@gmail.com',
		'&search_engine=v3',
	].join('');

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			authorization: process.env.MGMT_TOKEN,
		},
	});
}
