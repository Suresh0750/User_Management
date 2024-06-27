"use strict";
// import {Client} from "pg"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from 'dotenv'
// dotenv.config()
// export const client = new Client({
//     host: process.env.POSTGRES_HOST,
//     user : process.env.POSTGRES_USER,
//     port : 5432,
//     password :  process.env.POSTGRES_PASSWORD,
//     database : process.env.POSTGRES_DATABASE
// })
// export default async()=> await client.connect();
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    }
    else {
        console.log('Connected to the database');
    }
});
exports.default = pool;
