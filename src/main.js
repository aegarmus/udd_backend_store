import express from 'express';
import cors from 'cors'

import { serverInit } from './services/serverInit.js';
import authRouter from './routes/auth.routes.js'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRouter)

serverInit(app, PORT)