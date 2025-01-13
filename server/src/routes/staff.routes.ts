import { Router } from 'express';
import { Staff } from '../entities/crm/Staff.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import CustomRequest from '../interfaces/customRequest.interface';
import getTenantDatabaseConnection from '../config/tenantDB';
import { Acl } from '../entities/crm/Acl.entity';

const staffRouter = Router();

staffRouter.get('/', async (req: CustomRequest, res) => {
  console.log(req.referer);
  const connection = await getTenantDatabaseConnection(req.referer || "");
  const staffRepository = connection.getRepository(Staff);
  const aclRepository = connection.getRepository(Acl);

  const staff = await staffRepository.find();
  const acls = await aclRepository.find();

  const staffWithAcls = staff.map(staffMember => ({
    ...staffMember,
    acl: acls
      .filter(acl => staffMember.acl.indexOf(acl._id.toString()) >= 0)
      .map(acl => acl)
  }));

  console.log(staffWithAcls);
  res.json(staffWithAcls);
});

staffRouter.post('/', authMiddleware, async (req: CustomRequest, res) => {
  const staffRepository = (await getTenantDatabaseConnection(req.referer || "")).getRepository(Staff);
  const staff = staffRepository.create(req.body);
  const result = await staffRepository.save(staff);
  res.json(result);
});

export default staffRouter;