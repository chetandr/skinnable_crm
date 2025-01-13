import { Router } from 'express';
import { authenticateStaff } from '../services/authService';
import CustomRequest from '../interfaces/customRequest.interface';

const loginRouter = Router();

loginRouter.post('/', async (req: CustomRequest, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate user and get JWT token
    const token = await authenticateStaff(req.referer || "", email, password);

    // Send token as response
    res.json({ token });
  } catch (error: Error | any) {
    res.status(400).json({ message: error.message as string });
  }
});

export default loginRouter;