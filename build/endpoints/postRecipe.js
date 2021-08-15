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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateId_1 = require("../services/generateId");
const RecipeData_1 = require("../data/RecipeData");
const Authentication_1 = require("../services/Authentication");
const UserData_1 = require("../data/UserData");
const moment_1 = __importDefault(require("moment"));
const postRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, title, description } = req.body;
        const token = req.headers.authorization;
        if (!token) {
            res.statusCode = 422;
            throw new Error("'token' é obrigatório");
        }
        if (!author || !title || !description) {
            res.statusCode = 422;
            throw new Error("Esta faltando passar algum dado da receita");
        }
        const authenticationData = new Authentication_1.Authentication().getData(token);
        const user = yield new UserData_1.UserData().getUserById(authenticationData.id);
        if (authenticationData) {
            const id = generateId_1.generateId();
            const createdAt = moment_1.default(new Date()).format("YYYY/MM/DD");
            const recipe = new RecipeData_1.RecipeData();
            const newRecipe = recipe.createRecipe(id, authenticationData.id, author, title, description, createdAt);
            res.status(200).send({ message: 'receita adicionada com sucesso', id, author, title, description, createdAt
            });
        }
    }
    catch (err) {
        res.status(400).send({
            message: err.message,
        });
    }
});
exports.default = postRecipe;
