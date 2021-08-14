import { Request, Response } from "express";
import {Authentication} from "../services/Authentication";
import { RecipeData } from "../data/RecipeData";


const editRecipe = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id = req.body.id

      if (!token){
        res.statusCode = 422
        throw new Error("'token'é  obrigatório")
    }

      if (!id) {
        res.statusCode = 422
        throw new Error("'insira no body o id da receita que deseja deletar")
    }
     
      const authenticationData = new Authentication().getData(token);
  
       const c = new RecipeData()
       const id_recipe = await c.checkIds(id, authenticationData.id)
       if(!id_recipe){
        res.statusCode = 422
        throw new Error("Receita não encontrada")
       }

    if(authenticationData.id !== id_recipe.id_user && authenticationData.role !== "normal"){
        throw new Error("Você só pode alterar a própria Receita");
    }    
      
    if(authenticationData.id === id_recipe.id_user){
        const update = await c.deleteRecipe(id,id_recipe.id_user )

        res.status(200).send(`Receita deletada! `);
      }
    } catch (err:any) {
      res.status(400).send({
        message: err.message 
      });
    }
  }
  export default editRecipe
