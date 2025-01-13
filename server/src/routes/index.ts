import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import staffRouter from './staff.routes';
import loginRouter from './login.routes';
import fileRouter from './file.routes';
import organizationRouter from './organization.routes';
import industryRouter from './industry.routes';
import stageRouter from './stages.routes'; // Import the new stages route
import requestReferer from '../middleware/requestReferer.middleware';
import templateRouter from './template.routes';


const appRouter = Router();

appRouter.use(express.json());
appRouter.use(cors());
appRouter.use(express.json());
appRouter.use(requestReferer);
appRouter.use('/staff', staffRouter);
appRouter.use('/login', loginRouter);
appRouter.use('/files', fileRouter);
appRouter.use('/organization', organizationRouter);
appRouter.use('/industries', industryRouter);
appRouter.use('/stages', stageRouter); // Add the new stages route
appRouter.use('/template', templateRouter); // Add the new stages route

export default appRouter;