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
const FollowerData_1 = require("../data/FollowerData");
const Authentication_1 = require("../services/Authentication");
const UserData_1 = require("../data/UserData");
const toFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const id_following = req.body.id;
        if (!id_following) {
            res.statusCode = 422;
            throw new Error("'id' de quem você deseja seguir é obrigatório");
        }
        const authenticationData = new Authentication_1.Authentication().getData(token);
        if (id_following === authenticationData.id) {
            res.statusCode = 422;
            throw new Error("Você não pode seguir você mesmo!");
        }
        const result = yield new UserData_1.UserData().getUserById(id_following);
        if (!result) {
            res.statusCode = 422;
            throw "usuário não encontrado, id inválido!";
        }
        const userSearch = new FollowerData_1.FollowerData();
        const checkUser = yield userSearch.alreadyFollowing(authenticationData.id, id_following);
        if (checkUser.id_following) {
            res.statusCode = 422;
            throw new Error("Você já segue esta pessoa");
        }
        const user = yield new FollowerData_1.FollowerData().following(authenticationData.id, id_following);
        if (result && authenticationData.id) {
            const user_following = result.name;
            res.status(200).send(`Você está seguindo ${user_following}  `);
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.default = toFollow;
