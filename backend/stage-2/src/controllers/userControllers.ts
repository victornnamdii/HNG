import { NextFunction, Request, Response } from 'express';
import isUUID from 'validator/lib/isUUID';
import User from '../models/User';
import BodyError from '../utils/BodyError';
import UserValiadtor from '../utils/validators/userValidator';

type UserType = {
  email: string | undefined
  name: string | undefined,
  age: number | undefined,
  occupation: string | undefined
};

class UserController {
  static async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      UserValiadtor.validateNewUserBody(req.body);

      const {
        email,
        name,
        age,
        occupation
      } = req.body;

      const user = await User.create({
        email,
        name,
        age,
        occupation
      });

      res.status(201).json({
        message: 'New Person successfully added to DB',
        Person: user
      });
    } catch (error) {
      if (error instanceof BodyError) {
        res.status(400).json({ error: error.message });
        return;
      }
      if (error instanceof Error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // @ts-expect-error: Unreachable code error
          if (error.errors[0].path === 'name') {
            res.status(400).json({ error: 'Name already exists' });
            return;
          }
          res.status(400).json({ error: 'Email already exists' });
          return;
        }
      }
      next(error);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      if (!isUUID(user_id, 4)) {
        res.status(400).json({ error: 'Invalid User ID. Please enter a valid UUID V4.' });
        return;
      }

      const user = await User.findByPk(user_id);
      if (user !== null) {
        res.status(200).json({ Person: user });
      } else {
        res.status(404).json({ error: 'No user found with specified ID' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      const user = await User.findOne({ where: { name }});
      if (user !== null) {
        res.status(200).json({ Person: user });
      } else {
        res.status(404).json({ error: 'No user found with specified name' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const Persons = await User.findAll();
      res.status(200).json({ Persons });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      if (!isUUID(user_id, 4)) {
        res.status(400).json({ error: 'Invalid User ID. Please enter a valid UUID V4.' });
        return;
      }

      const user = await User.findByPk(user_id);
      if (user === null) {
        res.status(404).json({ error: 'No user found with specified ID' });
        return;
      }

      UserValiadtor.validateUpdateUserBody(req.body);
      const {
        email,
        name,
        age,
        occupation
      } = req.body;

      const updates: UserType = {
        email: undefined,
        name: undefined,
        age: undefined,
        occupation: undefined
      };
      if (email !== undefined) {
        updates.email = email;
      }
      if (name !== undefined) {
        updates.name = name;
      }
      if (age !== undefined) {
        updates.age = Number(age);
      }
      if (occupation !== undefined) {
        updates.occupation = occupation;
      }
      Object.keys(updates).forEach((key) => {
        if (updates[key as keyof typeof updates] === undefined) {
          delete updates[key as keyof typeof updates];
        }
      });

      await User.update(updates, { where: { id: user_id }});

      res.status(201).json({
        message: 'Person successfully updated',
        updates
      });
    } catch (error) {
      if (error instanceof BodyError) {
        res.status(400).json({ error: error.message });
        return;
      }
      if (error instanceof Error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // @ts-expect-error: Unreachable code error
          if (error.errors[0].path === 'name') {
            res.status(400).json({ error: 'Name already exists' });
            return;
          }
          res.status(400).json({ error: 'Email already exists' });
          return;
        }
      }
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req.params;
      if (!isUUID(user_id, 4)) {
        res.status(400).json({ error: 'Invalid User ID. Please enter a valid UUID V4.' });
        return;
      }

      const user = await User.findByPk(user_id);
      if (user === null) {
        res.status(404).json({ error: 'No user found with specified ID' });
        return;
      }

      await User.destroy({ where: { id: user_id }});
      res.status(200).json({
        message: `${user.name} successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
