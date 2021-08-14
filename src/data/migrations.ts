import  connection  from "../connection"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

   CREATE TABLE IF NOT EXISTS  cookenu_user(
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    role ENUM('normal', 'admin') DEFAULT 'normal'
    );

    CREATE TABLE IF NOT EXISTS cookenu_recipe(
        id VARCHAR(100) PRIMARY KEY,
        id_user VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_user) REFERENCES cookenu_user(id),
        author VARCHAR(64) NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(255) NOT NULL,
        createdAt DATE NOT NULL
        );

    CREATE TABLE IF NOT EXISTS cookenu_follower(
        id_user VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_user) REFERENCES cookenu_user(id),
        id_following VARCHAR(100) NOT NULL UNIQUE,
        FOREIGN KEY (id_user) REFERENCES cookenu_user(id)
        );
            

     `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)


