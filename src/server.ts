import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';

import trim from './middleware/trim';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    try {
        await createConnection();
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
})