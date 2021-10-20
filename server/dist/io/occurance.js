"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const broadcast_1 = __importDefault(require("./broadcast"));
const store_1 = require("./store");
function occurance(ws, payload, b) {
    const room = store_1.rooms.find((r) => r.id === payload.room);
    if (!room)
        return;
    const message = {
        message: '',
        createdAt: new Date(),
        type: payload.type,
        reason: payload.reason,
        user: null,
        sub: payload.sub,
        newState: payload.newState,
    };
    return broadcast_1.default(room, message, b);
}
exports.default = occurance;
