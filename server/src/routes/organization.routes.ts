import { Router } from 'express';
import { Organizations } from '../entities/crm/Organizations.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';

const organizationRouter = Router();

organizationRouter.get('/', async (req: CustomRequest, res) => {
  const organizationRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Organizations);
  const organizations = await organizationRepository.find({});
  console.log(organizations);
  res.json(organizations);
});

organizationRouter.post('/', authMiddleware, async (req: CustomRequest, res) => {
  const organizationRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Organizations);
  const organization = organizationRepository.create(req.body);
  const result = await organizationRepository.save(organization);
  res.json(result);
});

export default organizationRouter;