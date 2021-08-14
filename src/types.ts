export type user = {
   id: string
   name: string
   email: string
 }

export interface AuthenticationData {
   role: any
   id: string
}

export type recipe = {
   id_user: string   
   id: string
   author: string
   title: string
   description: string
}

export type Feed = {
   id: string  
   author: string
   title: string
   description: string
   createdAt: string
   id_user: string 
   name: string
}

    export const toModelRecipe = (input: any): Feed => {
      return {
         id: input.id,
         author: input.author,
         title: input.title,
         description: input.description,
         createdAt: input.createdAt,
         id_user: input.id_user,
         name: input.name
      }
   }