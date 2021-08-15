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
        const id_recipe = req.body.id;
        const author = req.body.author;
        const title = req.body.title;
        const description = req.body.description;
        if (!token) {
            res.statusCode = 422;
            throw new Error("'token'é  obrigatório");
        }
        if (!id_recipe || !author || !!title || !description) {
            res.statusCode = 422;
            throw new Error("insira no body os dados da receita que deseja alterar");
        }
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const c = new RecipeData_1.RecipeData();
        const id_user = yield c.checkIds(id_recipe, authenticationData.id);
        if (!id_user) {
            res.statusCode = 422;
            throw new Error("Receita não encontrada");
        }
        if (authenticationData.id !== id_user.id_user && authenticationData.role !== "normal") {
            throw new Error("Você só pode alterar a própria Receita");
        }
        if (authenticationData.id === id_user.id_user) {
            const update = yield c.updateRecipe(id_recipe, author, title, description);
            res.status(200).send(`Receita alterada `);
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});
exports.default = editRecipe;
