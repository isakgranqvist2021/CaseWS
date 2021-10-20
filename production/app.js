"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./utils/io");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./utils/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve('./src/.env'),
    debug: true, // remove this line in production
});
database_1.default();
const PORT = process.env.PORT || 8080;
const router_1 = __importDefault(require("./router"));
const router_2 = __importDefault(require("./io/router"));
io_1.app.use(express_1.default.json());
io_1.app.use(cors_1.default());
io_1.app.use('/public', express_1.default.static('./public'));
io_1.app.use('/uploads', express_1.default.static('./uploads'));
io_1.app.use('/chat', router_1.default);
io_1.wss.on('connection', router_2.default);
io_1.app.get('*', (req, res) => {
    return res.sendFile('./index.html', { root: './public' });
});
io_1.server.listen(PORT, () => {
    console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
