import { Router } from 'express';
import UserController from '../controllers/userControllers';

const userRouter: Router = Router();

userRouter.get('/', UserController.getUserByName);
userRouter.post('/', UserController.addUser);
userRouter.patch('/', UserController.updateUserWithName);
userRouter.delete('/', UserController.deleteUserWithName);
userRouter.get('/all/persons', UserController.getUsers);
userRouter.get('/:user_id', UserController.getUser);
userRouter.patch('/:user_id', UserController.updateUser);
userRouter.delete('/:user_id', UserController.deleteUser);

export default userRouter;