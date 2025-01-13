import { Router, Response } from 'express'; // Import the 'Response' type from 'express'
import { Industry } from '../entities/crm/Industry.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';
import { validateIndustry } from '../middleware/validate.middleware';
import { generateSlug } from './slug.util';

const industryRouter = Router();

industryRouter.get('/', async (req: CustomRequest, res) => {
    console.log(req.referer);
    const industryRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Industry);
    const industries = await industryRepository.find();
    console.log(industries);
    res.json(industries);
});

industryRouter.post('/', authMiddleware, validateIndustry, async (req: CustomRequest, res: Response<any>) => { // Remove the second type argument from 'Response'
    const industryRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Industry);
    const slug = generateSlug();
    const newIndustry = { name: req.body.name, slug };
    const industry = industryRepository.create(newIndustry);
    const result = await industryRepository.save(industry);
    res.json(result);
});

export default industryRouter;