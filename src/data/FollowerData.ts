import connection from '../connection'

const followerTable = "cookenu_follower";
const userTable = "cookenu_user";

export class FollowerData {

    following = async (id_user:string, id_following:string): Promise<void> => {
        await connection
        .insert ({id_user, id_following})
        .into(followerTable)
    };
    showFollowing = async (id_user: string, id_following: string): Promise<any> => {
    const result = await connection(followerTable)
    .select("userTable.id", "userTable.name")
    .where("followerTable.id_user", "=", id_user)
    .join("userTable", "id", "=", "followerTable.id_following" )
    
      return result
    };

    alreadyFollowing = async (id_user: string, id_following: string): Promise<any> => {
    const result = await connection(followerTable)
    .select("id_following")
    .where({id_user, id_following})
    return result
    }
  
    unfollow = async (id_user:string, id_following:string) : Promise<void> =>{
        await connection
        .delete()
        .from(followerTable)
        .where({id_user,id_following})
    }

    checkFollowing = async (id_user: string): Promise<any> => {
           const result = await connection(followerTable)
            .select("*")
            .where({id_user})
        return result 
    }
}