import isEmail from 'validator/lib/isEmail';
import BodyError from '../BodyError';
import User from '../../models/User';

class UserValiadtor {
  static validateNewUserBody(body: User) {
    if (body.name === undefined) {
      throw new BodyError('Please enter a name');
    }
    if (typeof body.name !== 'string') {
      throw new BodyError('Name should be a string');
    }
    if (body.email !== undefined) {
      if (typeof body.email !== 'string') {
        throw new BodyError('Email should be a string');
      }
      if (!isEmail(body.email)) {
        throw new BodyError('Please enter a valid email');
      }
    }
    if (body.age !== undefined) {
      if (typeof body.age !== 'string') {
        throw new BodyError('Age should be a string');
      }
      if (isNaN(body.age) || Number(body.age) <= 0) {
        throw new BodyError('Please enter a valid age');
      }
    }
    if (body.occupation !== undefined && typeof body.occupation !== 'string') {
      throw new BodyError('Occupation should be a string');
    }
  }

  static validateUpdateUserBody(body: User) {
    if (body.email !== undefined) {
      if (typeof body.email !== 'string') {
        throw new BodyError('Email should be a string');
      }
      if (!isEmail(body.email)) {
        throw new BodyError('Please enter a valid email');
      }
    }
    if (body.name !== undefined && typeof body.name !== 'string') {
      throw new BodyError('Name should be a string');
    }
    if (body.age !== undefined) {
      if (typeof body.age !== 'string') {
        throw new BodyError('Age should be a string');
      }
      if (isNaN(body.age) || Number(body.age) <= 0) {
        throw new BodyError('Please enter a valid age');
      }
    }
    if (body.occupation !== undefined && typeof body.occupation !== 'string') {
      throw new BodyError('Occupation should be a string');
    }
  }
}

export default UserValiadtor;
