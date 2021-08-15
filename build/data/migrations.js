"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const printError = (error) => { console.log(error.sqlMessage || error.message); };
const createTables = () => connection_1.default
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
        description VARCHAR(2055) NOT NULL,
        createdAt DATE NOT NULL
        );

    CREATE TABLE IF NOT EXISTS cookenu_follower(
        id_user VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_user) REFERENCES cookenu_user(id),
        id_following VARCHAR(100) NOT NULL UNIQUE,
        FOREIGN KEY (id_user) REFERENCES cookenu_user(id)
        );
            

     `)
    .then(() => { console.log("Tabelas criadas"); })
    .catch(printError);
createTables();
