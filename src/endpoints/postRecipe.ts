import { Request, Response } from "express";
import { generateId } from "../services/generateId";
import {RecipeData} from "../data/RecipeData";
import { Authentication } from "../services/Authentication";
import { UserData } from "../data/UserData";
import moment from 'moment';

const postRecipe = async (req: Request, res: Response) => {
    try {
        
     const {author, title, description } = req.body

     const token = req.headers.authorization as string;

     if (!token){
      res.statusCode = 422
      throw new Error("'token' é obrigatório")
  }
  if(!author ||!title || !description){
    res.statusCode = 422
      throw new Error("Esta faltando passar algum dado da receita")
  }

     const authenticationData = new Authentication().getData(token);
   
     const user = await new UserData().getUserById(authenticationData.id);
     if (authenticationData){

     const id  =   generateId();
     const createdAt = moment( new Date()).format("YYYY/MM/DD")
     
     const recipe = new RecipeData()
     const newRecipe = recipe.createRecipe(id, authenticationData.id, author, title, description,createdAt)
  
      res.status(200).send({ message: 'receita adicionada com sucesso', id, author, title, description, createdAt
      });
    }
    } catch (err:any) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
  export default postRecipe