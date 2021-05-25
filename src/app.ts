import express from 'express';
import bodyParser from 'body-parser';
import empRouter from "./routes/employee";
import { connectDB } from './db/dbConnection';
import { config } from 'dotenv';

export default async function init(){
    config();
    await connectDB();
    const app = express();
    
    //use middlewares
    app.use(bodyParser.json()); //for circular json
    app.use('/employee', empRouter);

    return app;
}


