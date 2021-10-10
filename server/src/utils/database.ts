/** @format */

import mongoose from 'mongoose';

export default async function connect() {
	try {
		await mongoose.connect(process.env.DB_URI, {});
		console.log('MongoDB has connected');
	} catch (err) {
		console.log('Database connection error %s', err);
		process.exit(1);
	}
}
