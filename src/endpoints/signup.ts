import { Request, Response } from "express";
import { generateId } from "../services/generateId";
import {UserData} from "../data/UserData";
import { Authentication } from "../services/Authentication";
import HashManager from "../services/HashManager";


const signup = async (req: Request, res: Response) => {
    try {

      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
  
      if (!req.body.password || req.body.password.length < 6) {
        throw new Error("Invalid password");
      }
   
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
           };
      let role  = req.body.role
      
      const id  =   generateId();
      const hm: HashManager = new HashManager()
      const cryptedPassword = await hm.hash(userData.password)
       
      const sending = new UserData()
      await sending.createUser(id , userData.name , userData.email, cryptedPassword )
     
    const token = new Authentication().generateToken({
        id,
        role
      });
  
      res.status(200).send({message:"Cadastro efetuado com sucesso",
        token,
      });
    } catch (err:any) {
      res.status(400).send({
        message: err.message,
      });
    }
  }
  export default signup