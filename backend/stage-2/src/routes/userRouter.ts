import { Router } from 'express';
import UserController from '../controllers/userControllers';

const userRouter: Router = Router();

userRouter.post('/api', UserController.addUser);
userRouter.get('/api/persons', UserController.getUsers);
userRouter.get('/api/:user_id', UserController.getUser);
userRouter.patch('/api/:user_id', UserController.updateUser);
userRouter.delete('/api/:user_id', UserController.deleteUser);

export default userRouter;