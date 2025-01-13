import { Router, Response } from 'express';
import { Stage } from '../entities/crm/stages.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';
import { validateStage } from '../middleware/validate.middleware';
import { generateSlug } from './slug.util';

const stageRouter = Router();

stageRouter.get('/', async (req: CustomRequest, res) => {
    console.log(req.referer);
    const stageRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Stage);
    const stages = await stageRepository.find();
    console.log(stages);
    res.json(stages);
});

stageRouter.post('/', authMiddleware, validateStage, async (req: CustomRequest, res: Response) => {
    const stageRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Stage);
    const slug = generateSlug();
    const newStage = { ...req.body, slug };
    const stage = stageRepository.create(newStage);
    const result = await stageRepository.save(stage);
    res.json(result);
});

export default stageRouter;