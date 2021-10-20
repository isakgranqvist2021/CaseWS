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
const axios_1 = __importDefault(require("axios"));
function search_users(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                headers: {
                    Authorization: 'Bearer ' + process.env.MGMT_TOKEN,
                },
            };
            const url = [
                'https://dustiastheguy.eu.auth0.com/api/v2/users',
                '?q=name:' + req.body.value,
                '&search_engine=v3',
            ].join('');
            const response = yield axios_1.default.get(url, options);
            let data = response.data;
            return res.json({
                message: '',
                success: true,
                data: data.map((u) => {
                    return {
                        email: u.email,
                        name: u.name,
                        sub: u.user_id,
                        picture: u.picture,
                        given_name: u.given_name,
                        family_name: u.family_name,
                        nickname: u.nickname,
                    };
                }),
            });
        }
        catch (err) {
            console.log(err);
            return res.json({
                message: 'internal server error',
                success: false,
                data: null,
            });
        }
    });
}
exports.default = search_users;
