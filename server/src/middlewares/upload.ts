/** @format */

import multer from 'multer';
import path from 'path';

const allowedFileExt: string[] = [
	'image/jpeg',
	'image/png',
	'image/jpg',
	'image/gif',
	'image/svg+xml',
	'application/pdf',
	'text/plain',
];

const storage = multer.diskStorage({
	destination(req: any, file: any, next: any) {
		return next(null, path.resolve('./uploads'));
	},
	filename(req: any, file: any, next: any) {
		return next(
			null,
			file.fieldname +
				'-' +
				Date.now() +
				path.extname(file.originalname).toLowerCase()
		);
	},
});

function fileFilter(req: any, file: any, next: any) {
	console.log(file.mimetype);

	return allowedFileExt.includes(file.mimetype)
		? next(null, true)
		: next('file not allowed', false);
}

export default function upload(req: any, res: any, next: any) {
	multer({ fileFilter, storage }).array('file', 5)(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			console.log(err);
			return res.json({
				message: err,
				success: false,
				data: null,
			});
		} else if (err) {
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
