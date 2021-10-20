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
function upload_file(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let files = req.files;
            let user = JSON.parse(req.body.user);
            if (!files)
                return res.json({
                    message: 'no files have been uploaded',
                    success: false,
                    data: null,
                });
            const message = {
                message: `${user.nickname} has uploaded ${files.length} file${files.length > 1 ? 's' : ''}`,
                createdAt: new Date(),
                user: user,
                type: 'file',
                files: [],
            };
            files.forEach((file) => {
                const host = `${process.env.HOST}${process.env.NODE_ENV === 'development'
                    ? ':' + process.env.PORT
                    : ''}/uploads`;
                if (file.mimetype.includes('image')) {
                    message.files.push({
                        fileType: 'image',
                        filename: file.filename,
                        src: `${host}/${file.filename}`,
                    });
                }
                else {
                    message.files.push({
                        fileType: 'file',
                        filename: file.filename,
                        src: `${host}/${file.filename}`,
                    });
                }
            });
            let room = store_1.rooms.find((room) => room.id === req.body.room);
            if (room) {
                yield chat_1.default.updateOne({ _id: req.body.room }, {
                    $push: { messages: message },
                });
                broadcast_1.default(room, message);
            }
            return res.json({
                message: 'files have been uploaded',
                success: true,
                data: null,
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
exports.default = upload_file;
