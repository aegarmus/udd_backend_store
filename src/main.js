import express from 'express';
import cors from 'cors'

import { serverInit } from './services/serverInit.js';
import routes from './routes/index.js'
import mercadopagoRouter from './routes/mercadopago.routes.js'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("public/uploads"));

app.use('/api/v1', routes)
app.use('/api/v1', mercadopagoRouter);

serverInit(app, PORT)