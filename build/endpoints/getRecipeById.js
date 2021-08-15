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
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const token = req.headers.authorization;
        const authenticationData = new Authentication_1.Authentication().getData(token);
        if (!id || !token) {
            res.statusCode = 422;
            throw new Error("'id' e 'token'são obrigatórios");
        }
        const recipeSearch = new RecipeData_1.RecipeData();
        const getRecipe = yield recipeSearch.getRecipeById(id);
        if (!getRecipe) {
            throw new Error("nenhuma receita encontrado com esse id");
        }
        const found = getRecipe;
        res.status(200).send(getRecipe);
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});
exports.default = getRecipeById;
