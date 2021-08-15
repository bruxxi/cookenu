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
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const feedRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        if (!token) {
            res.statusCode = 422;
            throw new Error("'token' é obrigatório");
        }
        if (authenticationData) {
            const id_user = authenticationData.id;
            const user = new FollowerData_1.FollowerData();
            const following = yield user.checkFollowing(id_user);
            let recipesFeed = [];
            for (let getFollowing of following) {
                const recipe = new RecipeData_1.RecipeData();
                const getAll = yield recipe.getFeed(getFollowing.id_following);
                recipesFeed.push(getAll);
            }
            if (!recipesFeed) {
                throw new Error("nenhuma receita cadastrada");
            }
            res.status(200).send(recipesFeed);
        }
    }
    catch (err) {
        res.status(400).send(err.sqlMessage || err.message);
    }
});
exports.default = feedRecipes;
