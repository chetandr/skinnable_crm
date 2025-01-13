import { Router } from 'express';
import { PointOfContact } from '../entities/crm/PointOfContact.column';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';

const pointsOfContactRouter = Router();

pointsOfContactRouter.get('/', async (req: CustomRequest, res) => {
  console.log(req.referer);
  const pointsOfContactRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(PointOfContact);
  const pointsOfContact = await pointsOfContactRepository.find();
  console.log(pointsOfContact);
  res.json(pointsOfContact);
});

pointsOfContactRouter.post('/', authMiddleware, async (req: CustomRequest, res) => {
  const pointsOfContactRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(PointOfContact);
  const pointOfContact = pointsOfContactRepository.create(req.body);
  const result = await pointsOfContactRepository.save(pointOfContact);
  res.json(result);
});

export default pointsOfContactRouter;