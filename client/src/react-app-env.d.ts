/** @format */

/// <reference types="react-scripts" />

interface IUser {
	email?: string;
	email_verified?: boolean;
	name?: string;
	nickname?: string;
	picture?: string;
	sub?: string;
	updated_at?: Date | string;
	role?: 'admin' | 'participant';
}

interface IMessage {
	message: string;
	createdAt: Date | string;
	user: IUser;
	type: 'event' | 'message' | 'file';
	eventType?: 'join' | 'leave';
	files?: any[];
}

interface IChat {
	_id: string;
	createdAt: string | Date;
	updatedAt: string | Date | null;
	messages: IMessage[];
	participants: IUser[];
}

interface IAction {
	type: string;
	payload: any;
}
