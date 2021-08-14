import { Request, Response } from "express";
import {Authentication} from "../services/Authentication";
import { RecipeData } from "../data/RecipeData";


const editRecipe = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const id_recipe = req.body.id
      const author = req.body.author
      const title = req.body.title 
      const description = req.body.description

      if (!token){
        res.statusCode = 422
        throw new Error("'token'é  obrigatório")
    }

      if (!id_recipe||!author||!!title||!description) {
        res.statusCode = 422
        throw new Error("insira no body os dados da receita que deseja alterar")
    }
     
      const authenticationData = new Authentication().getData(token);
  
       const c = new RecipeData()
       const id_user = await c.checkIds(id_recipe, authenticationData.id)
       if(!id_user){
        res.statusCode = 422
        throw new Error("Receita não encontrada")
       }

    if(authenticationData.id !== id_user.id_user && authenticationData.role !== "normal"){
        throw new Error("Você só pode alterar a própria Receita");
    }
      
    if(authenticationData.id === id_user.id_user){
        const update = await c.updateRecipe(id_recipe, author, title, description )

        res.status(200).send(`Receita alterada `);
      }
    } catch (err:any) {
      res.status(400).send({
        message: err.message 
      });
    }
  }
  export default editRecipe
