import express from 'express';
import 'dotenv/config';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
