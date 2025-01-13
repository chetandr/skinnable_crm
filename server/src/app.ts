import express from 'express';
import appRouter from './routes/index';
const app = express();
app.use('/', appRouter);

export default app;