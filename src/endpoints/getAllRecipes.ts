import { Request, Response } from "express"
import { RecipeData } from "../data/RecipeData"
import { Authentication } from "../services/Authentication";

export async function getAllRecipes(
   req: Request,
   res: Response
): Promise<void> {
   try {

    const token = req.headers.authorization as string;

    const authenticationData = new Authentication().getData(token);

    if (!token){
        res.statusCode = 422
        throw "'token'é  obrigatório"
    }

    if(authenticationData){
      const title = (req.query.title || "%") as string
      const sort = req.query.sort === "title" ? "title" : "createdAt"
      const order = req.query.order === "DESC" ? "DESC" : "ASC"
      const page = Number(req.query.page) || 1
      const size = Number(req.query.size) || 10

      const offset:number = size * (page - 1)
      
      const rd = new RecipeData();

      const recipes = await rd.getRecipes(title, sort, order, size, offset);

      res.status(200).send(recipes)
    }

   } catch (err:any) {
        res.status(400).send({
          message: err.message,
        });
      }
}