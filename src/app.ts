// src/app.ts
import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import authRoutes from './routes/authRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import { swaggerDocs } from './config/swagger';
import { errorHandler } from './middlewares/errorMiddleware';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', appointmentRoutes);
app.use(errorHandler);

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });


app.use(errorHandler);

swaggerDocs(app, Number(process.env.PORT) || 3000);

export default app;
