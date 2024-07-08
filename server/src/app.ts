import express from 'express';
import mongoose from 'mongoose';
require("dotenv").config({ path: '../.env' });
require("express-async-errors");
import cors from "cors";

import login from './controllers/login';
import trainingsRouter from './routes/trainings';
import usersRouter from './routes/users';

import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';
import authenticate from './middleware/authentication';

const app = express();

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, CREATE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

app.use(cors());

app.use("/api", authenticate);
app.use("/api/trainings", trainingsRouter);
app.use("/api/users", usersRouter);

app.post("/auth/login", login);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}...`);
        });
    } catch(err) {
        console.log(err);
    }
}

start();

