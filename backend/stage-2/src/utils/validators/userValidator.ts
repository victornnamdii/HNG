import isEmail from 'validator/lib/isEmail';
import BodyError from '../BodyError';
import User from '../../models/User';

class UserValiadtor {
  static validateNewUserBody(body: User) {
    if (body.email === undefined) {
      throw new BodyError('Please enter an email');
    }
    if (typeof body.email !== 'string') {
      throw new BodyError('Email should be a string');
    }
    if (!isEmail(body.email)) {
      throw new BodyError('Please enter a valid email');
    }
    if (body.firstName === undefined) {
      throw new BodyError('Please enter a first name');
    }
    if (typeof body.firstName !== 'string') {
      throw new BodyError('First name should be a string');
    }
    if (body.lastName === undefined) {
      throw new BodyError('Please enter a last name');
    }
    if (typeof body.lastName !== 'string') {
      throw new BodyError('Last name should be a string');
    }
    if (body.age === undefined) {
      throw new BodyError('Please enter your age');
    }
    if (typeof body.age !== 'string') {
      throw new BodyError('Age should be a string');
    }
    if (isNaN(body.age) || Number(body.age) <= 0) {
      throw new BodyError('Please enter a valid age');
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
    if (body.firstName !== undefined && typeof body.firstName !== 'string') {
      throw new BodyError('First name should be a string');
    }
    if (body.lastName !== undefined && typeof body.lastName !== 'string') {
      throw new BodyError('Last name should be a string');
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
