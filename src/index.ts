import app from "./app"
import signup from './endpoints/signup'
import login from "./endpoints/login"
import profile from './endpoints/profile'
import getProfileById from "./endpoints/getProfileById"
import postRecipe from "./endpoints/postRecipe"
import getRecipeById from "./endpoints/getRecipeById"
import tofollow from "./endpoints/toFollow"
import following from "./endpoints/following"
import feedRecipes from "./endpoints/feedRecipes"
import unfollow from "./endpoints/unfollow"
import { getAllRecipes } from "./endpoints/getAllRecipes"
import editRecipe from "./endpoints/editRecipe"
import deleteRecipe from "./endpoints/deleteRecipe"

app.post("/user/signup", signup) 
app.post("/user/login", login)
app.get("/user/profile", profile)
app.get("/user/:id", getProfileById)
app.post("/recipe/add", postRecipe)
app.get("/recipe/:id", getRecipeById)
app.post("/user/follow", tofollow)
app.get("/recipe", feedRecipes)
app.get("/following", following)
app.delete("/user/unfollow", unfollow)
app.get("/recipes/All", getAllRecipes)
app.put("/recipe/edit", editRecipe)
app.delete("/recipe/delete", deleteRecipe)