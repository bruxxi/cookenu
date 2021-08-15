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
const Authentication_1 = require("../services/Authentication");
const RecipeData_1 = require("../data/RecipeData");
const editRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const id = req.body.id;
        if (!token) {
            res.statusCode = 422;
            throw new Error("'token'é  obrigatório");
        }
        if (!id) {
            res.statusCode = 422;
            throw new Error("'insira no body o id da receita que deseja deletar");
        }
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const c = new RecipeData_1.RecipeData();
        const id_recipe = yield c.checkIds(id, authenticationData.id);
        if (!id_recipe) {
            res.statusCode = 422;
            throw new Error("Receita não encontrada");
        }
        if (authenticationData.id !== id_recipe.id_user && authenticationData.role !== "normal") {
            throw new Error("Você só pode alterar a própria Receita");
        }
        if (authenticationData.id === id_recipe.id_user) {
            const update = yield c.deleteRecipe(id, id_recipe.id_user);
            res.status(200).send(`Receita deletada! `);
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.default = editRecipe;
