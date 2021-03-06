import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import groupRoutes from './routes/groups';
import commentRoutes from './routes/comments';
import otherRoutes from './routes/other';

import trim from './middleware/trim';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(trim);
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}));

app.use(express.static('public'));

app.get('/api', (_, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/other', otherRoutes);

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    try {
        await createConnection();
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
})