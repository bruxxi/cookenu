import { Request, Response } from "express";
import {UserData} from "../data/UserData";
import { Authentication } from "../services/Authentication";
import HashManager from "../services/HashManager";

const login = async (req: Request, res: Response) => {
    try {

      if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }
  
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
           };
      let role  = req.body.role
      
      const user = await new UserData().getUserByEmail(userData.email);
      if(!user){
        res.statusCode = 422
        throw new Error(`E-mail não cadastrado`)
      }
      
            
      const hm = new HashManager()
      const compare =  await hm.compare(userData.password, user.password)

      if (!compare) {
        throw new Error("Invalid password");
      }
        
      const token = new Authentication().generateToken({
        id: user.id,
        role
      });
  
      res.status(200).send({
        token,
      })
    } catch (err:any) {
      res.status(400).send({
        message: err.message || err.sqlMessage
      });
    }
  }
  export default login