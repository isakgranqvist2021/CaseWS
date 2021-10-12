/** @format */

import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	updatedAt: { type: Date, default: null },
	participants: { type: Array, default: [] },
	messages: { type: Array, default: [] },
});

const ChatModel = mongoose.model('Chat', chatSchema);

const create = async (user: any): Promise<any> => {
	try {
		return await new ChatModel({
			participants: [
				{
					...user,
					role: 'admin',
				},
			],
		}).save();
	} catch (err) {
		return Promise.reject(err);
	}
};

const findMany = async (filter: any): Promise<any> => {
	try {
		return await ChatModel.find(filter);
	} catch (err) {
		return Promise.reject(err);
	}
};

const findOne = async (filter: any): Promise<any> => {
	try {
		return await ChatModel.findOne(filter);
	} catch (err) {
		return Promise.reject(err);
	}
};

const updateOne = async (filter: any, update: any): Promise<any> => {
	try {
		return await ChatModel.updateOne(filter, update);
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
};

export default {
	create,
	findOne,
	findMany,
	updateOne,
};
