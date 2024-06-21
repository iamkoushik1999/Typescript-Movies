import express from 'express';
import 'dotenv/config';
import compression from 'compression';
// Database
import connectDB from './config/db';
connectDB();

// App
const app = express();

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
