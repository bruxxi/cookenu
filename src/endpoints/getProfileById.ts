import { Request, Response } from "express";
import { UserData } from "../data/UserData";
import { Authentication } from "../services/Authentication";

const getProfileById = async (req: Request, res: Response) => {
    try {
        const id =  req.params.id
        const token = req.headers.authorization as string;

        const authenticationData = new Authentication().getData(token);

        if (!id||!token){
                res.statusCode = 422
                throw new Error("'id' e 'token' são obrigatórios")
            }
        
        const userSearch = new UserData()
        const getUser = await userSearch.getUserById(id)
        if (!getUser){
            throw new Error("nenhum usuario encontrado com esse id")
        }
        const foundUser = getUser
        res.status(200).send(getUser)

    } catch (err:any) {
        res.status(400).send({
          message: err.message,
        });
      }

}
export default getProfileById