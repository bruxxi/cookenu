"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toModelRecipe = void 0;
const toModelRecipe = (input) => {
    return {
        id: input.id,
        author: input.author,
        title: input.title,
        description: input.description,
        createdAt: input.createdAt,
        id_user: input.id_user,
        name: input.name
    };
};
exports.toModelRecipe = toModelRecipe;
