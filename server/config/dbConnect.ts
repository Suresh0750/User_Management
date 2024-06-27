// import {Client} from "pg"

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
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

export default pool;
