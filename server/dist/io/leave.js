"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const broadcast_1 = __importDefault(require("./broadcast"));
const chat_1 = __importDefault(require("../models/chat"));
function leave(ws, payload, b) {
    return __awaiter(this, void 0, void 0, function* () {
        let room = store_1.rooms.find((room) => room.id === payload.room);
        if (!room)
            return;
        let index = room.connections.findIndex((id) => id === payload.socketId);
        if (index >= 0) {
            room.connections.splice(index, 1);
        }
        if (room.connections.length === 0) {
            index = store_1.rooms.findIndex((room) => room.id === payload.room);
            store_1.rooms.splice(index, 1);
        }
        let socket = store_1.sockets.find((v) => v.id === payload.socketId);
        if (socket)
            socket.socket = ws;
        let message = {
            message: `${payload.user.nickname} has left the room`,
            createdAt: new Date(),
            user: payload.user,
            type: 'event',
            eventType: 'leave',
        };
        yield chat_1.default.updateOne({ _id: payload.room }, {
            $push: { messages: message },
        });
        if (!room) {
            room = store_1.rooms.find((room) => room.id === payload.room);
            return broadcast_1.default(room, message);
        }
        return broadcast_1.default(room, message);
    });
}
exports.default = leave;
