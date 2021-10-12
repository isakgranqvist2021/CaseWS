/** @format */

import { rooms } from './store';
import { IMessage } from 'types';
import WebSocket from 'ws';
import chat from '../models/chat';
import broadcast from './broadcast';

export default async function send(ws: WebSocket, payload: any, b?: boolean) {}
