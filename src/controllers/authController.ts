
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middlewares/errorMiddleware';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ name, email, password: hashedPassword });
        await userRepository.save(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: errorHandler });
    }
};
