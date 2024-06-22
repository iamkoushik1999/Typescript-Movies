import express from 'express';
import 'dotenv/config';
import compression from 'compression';
// Database
import connectDB from './config/db';
connectDB();
// Middleware
import { notFound, errorHandler } from './middlewares/errorMiddleware';

// App
const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);

export default app;
