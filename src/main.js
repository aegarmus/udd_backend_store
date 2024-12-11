import express from 'express';
import cors from 'cors'
import { serverInit } from './services/serverInit.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

serverInit(app, PORT)