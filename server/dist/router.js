"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_chat_1 = __importDefault(require("./controllers/create_chat"));
const find_chats_1 = __importDefault(require("./controllers/find_chats"));
const find_chat_1 = __importDefault(require("./controllers/find_chat"));
const search_users_1 = __importDefault(require("./controllers/search_users"));
const add_user_1 = __importDefault(require("./controllers/add_user"));
const upload_file_1 = __importDefault(require("./controllers/upload_file"));
const leave_chat_1 = __importDefault(require("./controllers/leave_chat"));
const upload_1 = __importDefault(require("./middlewares/upload"));
const router = express_1.default.Router();
router.post('/create', create_chat_1.default);
router.get('/chats/:id', find_chats_1.default);
router.get('/find/:id', find_chat_1.default);
router.post('/add-user', add_user_1.default);
router.post('/users/search', search_users_1.default);
router.post('/leave', leave_chat_1.default);
router.post('/upload', upload_1.default, upload_file_1.default);
exports.default = router;
