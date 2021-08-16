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
exports.RecipeData = void 0;
const connection_1 = __importDefault(require("../connection"));
const types_1 = require("../types");
const recipeTable = "cookenu_recipe";
const userTable = "cookenu_user";
class RecipeData {
    constructor() {
        this.createRecipe = (id, id_user, author, title, description, createdAt) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .insert({
                id,
                id_user,
                author,
                title,
                description,
                createdAt
            })
                .into(recipeTable);
        });
        this.getFeed = (id_following) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(userTable)
                .select("cookenu_recipe.id", "cookenu_recipe.author", "cookenu_recipe.title", "cookenu_recipe.description", "cookenu_recipe.createdAt", "cookenu_recipe.id_user", "cookenu_user.name")
                .where("cookenu_recipe.id_user", "=", id_following)
                .join("cookenu_recipe", "id_user", "=", "cookenu_user.id")
                .orderBy("createdAt", "ASC");
            return result;
        });
        this.getRecipeByTitle = (title) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("*")
                .from(recipeTable)
                .where({ title });
            return result[0];
        });
        this.getRecipeById = (id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default
                .select("*")
                .from(recipeTable)
                .where({ id });
            return result[0];
        });
        this.getRecipes = (title, sort, order, size, offset) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(recipeTable)
                .where("title", "LIKE", `%${title}%`)
                .orderBy(sort, order)
                .limit(size)
                .offset(offset);
            const recipes = result.map(types_1.toModelRecipe);
            return recipes;
        });
        this.checkIds = (id, id_user) => __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.default(recipeTable)
                .select("id_user")
                .where({ id, id_user });
            return result[0];
        });
        this.updateRecipe = (id, author, title, description) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default
                .update({
                author,
                title,
                description
            })
                .where({ id })
                .into(recipeTable);
        });
        this.deleteRecipe = (id, id_user) => __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default(recipeTable)
                .delete()
                .where({ id, id_user });
        });
    }
}
exports.RecipeData = RecipeData;
