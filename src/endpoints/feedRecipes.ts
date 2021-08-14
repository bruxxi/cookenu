import { Request, Response } from "express";
import { FollowerData } from "../data/FollowerData";
import { RecipeData } from "../data/RecipeData";
import { Authentication } from "../services/Authentication";

const feedRecipes = async (req: Request, res: Response) => {
    try {
        
        const token = req.headers.authorization as string;

        const authenticationData = new Authentication().getData(token);
  
        if (!token){
            res.statusCode = 422
            throw new Error("'token' é obrigatório")
        }
        if(authenticationData){
         const id_user = authenticationData.id
         const user = new FollowerData()
         const following = await user.checkFollowing(id_user);
   
         let recipesFeed:any[] = []

         for (let getFollowing of following){
         const recipe = new RecipeData()
         const getAll = await recipe.getFeed(getFollowing.id_following)
         recipesFeed.push(getAll)
    }
         
        if (!recipesFeed){
            throw new Error("nenhuma receita cadastrada")
        }
        
        res.status(200).send(recipesFeed)
    }

    } catch (err:any) {
        res.status(400).send(err.sqlMessage || err.message);
      }

}

export default feedRecipes