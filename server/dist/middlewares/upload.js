"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const allowedFileExt = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/svg+xml',
];
const storage = multer_1.default.diskStorage({
    destination(req, file, next) {
        return next(null, path_1.default.resolve('./uploads'));
    },
    filename(req, file, next) {
        return next(null, file.fieldname +
            '-' +
            Date.now() +
            path_1.default.extname(file.originalname).toLowerCase());
    },
});
function fileFilter(req, file, next) {
    console.log(file.mimetype);
    return allowedFileExt.includes(file.mimetype)
        ? next(null, true)
        : next('file not allowed', false);
}
function upload(req, res, next) {
    multer_1.default({ fileFilter, storage }).array('file', 5)(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            console.log(err);
            return res.json({
                message: err,
                success: false,
                data: null,
            });
        }
        else if (err) {
            console.log(err);
            return res.json({
                message: 'an error has occured',
                success: false,
                data: null,
            });
        }
        next();
    });
}
exports.default = upload;
