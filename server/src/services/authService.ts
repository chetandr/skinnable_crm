import { AppDataSource } from '../config/db';
import getTenantDatabaseConnection from '../config/tenantDB';
import { Staff } from '../entities/crm/Staff.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Acl } from '../entities/crm/Acl.entity';
import { ObjectId } from 'mongodb';

const JWT_SECRET = 'your_secret_key'; // Use a strong secret key for JWT

export const authenticateStaff = async (referer: string, email: string, password: string) => {
  const connection = await getTenantDatabaseConnection(referer || "");
  const staffRepository = connection.getRepository(Staff);
  const aclRepository = connection.getRepository(Acl);

  // Find staff by email
  const staff = await staffRepository.findOneBy({ email });
  console.log(email, staff);

  if (!staff) {
    throw new Error('Staff not found');
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, staff.password || "");

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Fetch ACLs for the staff
  // const acls = await aclRepository.find();

  // const staffWithAcls = acls
  //   .filter(acl => staff.acl.indexOf(acl._id.toString()) >= 0)
  //   .map(acl => acl.name)

  // Add ACLs to the staff object
  // staff.acl = staffWithAcls;
  console.log(email, staff);


  // Generate JWT token
  const token = jwt.sign({ id: staff._id, acl: staff.acl }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};