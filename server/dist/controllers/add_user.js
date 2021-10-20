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
const chat_1 = __importDefault(require("../models/chat"));
function add_user(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const c = yield chat_1.default.findOne({ _id: req.body.room });
            if (!c)
                return res.json({
                    message: 'room not found',
                    success: false,
                    data: null,
                });
            if (c.participants.some((u) => u.sub === req.body.user.sub)) {
                return res.json({
                    message: 'user already exists',
                    success: false,
                    data: null,
                });
            }
            c.participants.push(req.body.user);
            yield c.save();
            return res.json({
                message: 'user added',
                success: true,
                data: null,
            });
        }
        catch (err) {
            return res.json({
                message: 'user already exists',
                success: false,
                data: null,
            });
        }
    });
}
exports.default = add_user;
