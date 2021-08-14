import {UserData} from "../data/UserData";
import { Request, Response } from "express";
import {Authentication} from "../services/Authentication";
import { FollowerData } from "../data/FollowerData";


const following = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const authenticationData = new Authentication().getData(token);
      if (!token){
        res.statusCode = 422
        throw new Error("'token' é obrigatório")
    }

    const id_user = authenticationData.id
  
      const user = new FollowerData()
      const following = await user.checkFollowing(id_user);
      res.status(200).send(following);
    } catch (err:any) {
      res.status(400).send(err.sqlMessage || err.message)
    }
  }
  export default following