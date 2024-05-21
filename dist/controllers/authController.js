"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const database_1 = require("../config/database");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = userRepository.create({ name, email, password: hashedPassword });
        yield userRepository.save(user);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(secret);
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: errorMiddleware_1.errorHandler });
    }
});
exports.login = login;
