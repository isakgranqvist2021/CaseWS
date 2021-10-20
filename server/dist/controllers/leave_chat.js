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
const store_1 = require("../io/store");
const broadcast_1 = __importDefault(require("../io/broadcast"));
const chat_1 = __importDefault(require("../models/chat"));
function leave_chat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.room)
            return res.json({
                message: 'missing required data [room]',
                success: false,
                data: null,
            });
        if (!req.body.user)
            return res.json({
                message: 'missing required data [user]',
                success: false,
                data: null,
            });
        if (!req.body.user.sub)
            return res.json({
                message: 'missing required data [user.sub]',
                success: false,
                data: null,
            });
        if (!req.body.user.nickname)
            return res.json({
                message: 'missing required data [user.nickname]',
                success: false,
                data: null,
            });
        try {
            const update = yield chat_1.default.findOne({ _id: req.body.room });
            const part = update.participants;
            const index = part.findIndex((u) => u.sub === req.body.user.sub);
            part.splice(index, 1);
            if (part.length === 0) {
                yield chat_1.default.deleteOne({ _id: req.body.room });
            }
            else {
                yield update.save();
            }
            const message = {
                message: `${req.body.user.nickname} has been removed`,
                createdAt: new Date(),
                user: req.body.user,
                type: 'occurance',
                reason: 'left',
                room: req.body.room,
            };
            const room = store_1.rooms.find((room) => room.id === req.body.room);
            if (room && part > 0)
                broadcast_1.default(room, message);
            return res.json({
                message: "you've left the room",
                success: true,
                data: message,
            });
        }
        catch (err) {
            return res.json({
                message: 'internal server error',
                success: false,
                data: null,
            });
        }
    });
}
exports.default = leave_chat;
