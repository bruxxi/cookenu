import connection from '../connection'
import { Feed, recipe, toModelRecipe, user } from '../types'

const recipeTable = "cookenu_recipe"
const userTable = "cookenu_user"

export class RecipeData {

createRecipe = async (id: string, 
  id_user: string, 
  author: string, 
  title: string, 
  description: string, 
  createdAt: string): Promise<void> => {
  await connection
      .insert({
        id,
        id_user,
        author,
        title,
        description,
        createdAt
      })
      .into(recipeTable);
    }

  getFeed = async(id_following:string): Promise<Feed[]> => {
      const result = await connection(userTable)
      .select("cookenu_recipe.id", "cookenu_recipe.author", "cookenu_recipe.title","cookenu_recipe.description","cookenu_recipe.createdAt","cookenu_recipe.id_user","cookenu_user.name")
      .where("cookenu_recipe.id_user", "=", id_following)
      .join("cookenu_recipe","id_user","=", "cookenu_user.id")
      .orderBy("createdAt", "ASC")    
      return result
    }

getRecipeByTitle = async(title: string): Promise<any> => {
     const result = await connection
      .select("*")
      .from(recipeTable)
      .where({ title });
 
    return result[0];
   }
   
getRecipeById= async (id: string): Promise<user> => {
      const result = await connection
      .select("*")
      .from(recipeTable)
      .where({ id });

      return result[0];
  }
 
  getRecipes = async (
    title: string,
    sort: string,
    order: string,
    size: number,
    offset: number
): Promise<recipe[]> =>{
  console.log("chegou aqui",title, sort,order,size,offset)
    const result = await connection(recipeTable)
     .where("title", "LIKE", `%${title}%`)
     .orderBy(sort, order)
     .limit(size)
     .offset(offset)
    console.log(result)
  const recipes = result.map(toModelRecipe)
  return recipes;
}
checkIds = async (id:string, id_user:string):Promise<any> =>{
  const result = await connection(recipeTable)
  .select("id_user")
  .where({id, id_user})
  return result[0]
}
updateRecipe = async (id:string, 
  author: string, 
  title: string, 
  description: string
  ): Promise<void> => {  await connection
      .update({
        author,
        title,
        description
      })
      .where({id})
      .into(recipeTable)
    }
    deleteRecipe = async (id:string, id_user:string): Promise<any> =>{
      await connection(recipeTable)
      .delete()
      .where({id, id_user})
    }
}
