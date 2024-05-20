
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,
    entities: [User, Appointment],
    synchronize: true,
});
