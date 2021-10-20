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
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    participants: { type: Array, default: [] },
    messages: { type: Array, default: [] },
});
const ChatModel = mongoose_1.default.model('Chat', chatSchema);
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield new ChatModel({
            participants: [
                Object.assign(Object.assign({}, user), { role: 'admin' }),
            ],
        }).save();
    }
    catch (err) {
        return Promise.reject(err);
    }
});
const findMany = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ChatModel.find(filter);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
const findOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ChatModel.findOne(filter);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
const updateOne = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ChatModel.updateOne(filter, update);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
const deleteOne = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ChatModel.deleteOne(filter);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.default = {
    create,
    findOne,
    findMany,
    updateOne,
    deleteOne,
};
