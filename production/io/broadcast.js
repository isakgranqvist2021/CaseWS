"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const store_1 = require("./store");
function broadcast(room, payload, b) {
    const clients = store_1.sockets
        .filter((v) => room.connections.includes(v.id))
        .map((v) => v.socket);
    return clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN)
            client.send(JSON.stringify(payload), { binary: b });
    });
}
exports.default = broadcast;
