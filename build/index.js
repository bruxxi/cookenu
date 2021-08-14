"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const editUser_1 = __importDefault(require("./endpoints/editUser"));
const createUser_1 = __importDefault(require("./endpoints/createUser"));
const Authenticator_1 = require("../src/services/Authenticator");
const auth = new Authenticator_1.Authenticator();
const token = auth.generateToken({ id: "meu-id-legal" });
console.log(token);
app_1.default.post('/user/signup', createUser_1.default);
app_1.default.put('/user/edit/:id', editUser_1.default);
