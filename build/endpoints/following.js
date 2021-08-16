"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserData_1 = require("../data/UserData");
const Authentication_1 = require("../services/Authentication");
const FollowerData_1 = require("../data/FollowerData");
const following = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        if (!token) {
            res.statusCode = 422;
            throw new Error("'token' é obrigatório");
        }
        const id_user = authenticationData.id;
        const user = new FollowerData_1.FollowerData();
        const following = yield user.checkFollowing(id_user);
        const userName = yield new UserData_1.UserData().getUserById(authenticationData.id);
        const name = userName.name;
        if (!following.id_user) {
            res.statusCode = 422;
            throw new Error(`${name} não está seguindo ninguém`);
        }
        res.status(200).send(following);
    }
    catch (err) {
        res.status(400).send(err.sqlMessage || err.message);
    }
});
exports.default = following;
