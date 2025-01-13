import { Router, Response } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';
import { validateStage } from '../middleware/validate.middleware';
import { generateSlug } from './slug.util';
import { Template } from '../entities/crm/Template.entity';

const templateRouter = Router();

templateRouter.get('/', async (req: CustomRequest, res) => {
    const templateRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Template);
    const template = await templateRepository.findOne({ ...req.query });
    console.log(req.query.name, template);
    res.json(template);
});

templateRouter.post('/', authMiddleware, validateStage, async (req: CustomRequest, res: Response) => {
    const templateRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Template);
    const slug = generateSlug();
    const newStage = { ...req.body, slug };
    const template = templateRepository.create(newStage);
    const result = await templateRepository.save(template);
    res.json(result);
});

export default templateRouter;