"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const swagger_1 = require("./config/swagger");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api', appointmentRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
app.use(errorMiddleware_1.errorHandler);
(0, swagger_1.swaggerDocs)(app, Number(process.env.PORT) || 3000);
exports.default = app;
