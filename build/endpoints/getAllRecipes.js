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
exports.getAllRecipes = void 0;
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
function getAllRecipes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const authenticationData = new Authentication_1.Authentication().getData(token);
            if (!token) {
                res.statusCode = 422;
                throw "'token'é  obrigatório";
            }
            if (authenticationData) {
                const title = (req.query.title || "%");
                const sort = req.query.sort === "title" ? "title" : "createdAt";
                const order = req.query.order === "DESC" ? "DESC" : "ASC";
                const page = Number(req.query.page) || 1;
                const size = Number(req.query.size) || 10;
                const offset = size * (page - 1);
                const rd = new RecipeData_1.RecipeData();
                const recipes = yield rd.getRecipes(title, sort, order, size, offset);
                res.status(200).send(recipes);
            }
        }
        catch (err) {
            res.status(400).send({
                message: err.message,
            });
        }
    });
}
exports.getAllRecipes = getAllRecipes;
