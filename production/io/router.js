"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = __importDefault(require("./join"));
const leave_1 = __importDefault(require("./leave"));
const send_1 = __importDefault(require("./send"));
const occurance_1 = __importDefault(require("./occurance"));
function io(ws) {
    ws.on('message', (e, isBinary) => {
        const payload = JSON.parse(e);
        switch (payload.type) {
            case 'join':
                return join_1.default(ws, payload, isBinary);
            case 'message':
                return send_1.default(ws, payload, isBinary);
            case 'leave':
                return leave_1.default(ws, payload, isBinary);
            case 'occurance':
                return occurance_1.default(ws, payload, isBinary);
            default:
                return;
        }
    });
}
exports.default = io;
