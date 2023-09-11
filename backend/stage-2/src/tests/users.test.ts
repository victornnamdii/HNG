import chai, { expect } from 'chai';
import { describe, it, afterEach, beforeEach } from 'mocha';
import chaiHttp from 'chai-http';
import { v4 } from 'uuid';
import { Op } from 'sequelize';
import app from '../server';
import User from '../models/User';

const days = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

chai.use(chaiHttp);

const testMail = 'test@hng.com';
const requestBody = {
  email: testMail,
  name: 'test',
  age: '22',
  occupation: 'Backend Engineer'
};

describe('Server Tests', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {
        [Op.or]: [
          { email: testMail },
          { email: 'test2@gmail.com' }
        ]
      }
    });
  });
  afterEach(async () => {
    await User.destroy({
      where: {
        [Op.or]: [
          { email: testMail },
          { email: 'test2@gmail.com' }
        ]
      }
    });
  });
  describe('POST /api', () => {
    it('should create a new Person', async () => {

      const res = await chai
        .request(app)
        .post('/api')
        .send(requestBody);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('New Person successfully added to DB');
      expect(res.body.Person).to.exist;
      expect(res.body.Person.email).to.equal(requestBody.email);
      expect(res.body.Person.name).to.equal(requestBody.name);
      expect(res.body.Person.age).to.equal(Number(requestBody.age));
      expect(res.body.Person.occupation).to.equal(requestBody.occupation);
    });

    it('should say email already exists', async () => {
      let res = await chai
        .request(app)
        .post('/api')
        .send(requestBody);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('New Person successfully added to DB');
      expect(res.body.Person).to.exist;
      expect(res.body.Person.email).to.equal(requestBody.email);
      expect(res.body.Person.name).to.equal(requestBody.name);
      expect(res.body.Person.age).to.equal(Number(requestBody.age));
      expect(res.body.Person.occupation).to.equal(requestBody.occupation);

      res = await chai
        .request(app)
        .post('/api')
        .send(requestBody);

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email already exists');
    });

    it('should say email should be a string', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: true,
          name: requestBody.name,
          age: requestBody.age,
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email should be a string');
    });

    it('should say please enter a valid email', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: 'invalidemail@',
          name: requestBody.name,
          age: requestBody.age,
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid email');
    });

    it('should say please enter a name', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          // name: requestBody.name,
          age: requestBody.age,
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a name');
    });

    it('should say name should be a string', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: 2345,
          age: requestBody.age,
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Name should be a string');
    });

    it('should say Age should be a string', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: requestBody.name,
          age: 27,
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Age should be a string');
    });

    it('should say enter valid age', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: requestBody.name,
          age: '-27',
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter valid age, alt', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: requestBody.name,
          age: '0',
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter valid age, alt 2', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: requestBody.name,
          age: 'duba',
          occupation: requestBody.occupation
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say occupation should be a string', async () => {
      const res = await chai
        .request(app)
        .post('/api')
        .send({
          email: requestBody.email,
          name: requestBody.name,
          age: '28',
          occupation: false
        });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Occupation should be a string');
    });
  });

  describe('GET /api/all/persons', () => {
    it('should get all Persons', async () => {

      const res = await chai
        .request(app)
        .get('/api/all/persons');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.Persons).to.exist;
      expect(res.body.Persons).to.be.an('array');
      const Persons = res.body.Persons as User[];
      Persons.forEach((person) => {
        expect(person.id).to.exist;
        expect(person.name).to.exist;
      });
    });
  });

  describe('GET /api/:user_id', () => {
    it('should get a Person', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .get(`/api/${user.id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.Person).to.exist;
      expect(res.body.Person).to.be.an('object');
      const person = res.body.Person as User;
      expect(person.id).to.exist;
      expect(person.name).to.exist;
    });

    it('should say invalid ID', async () => {
      const res = await chai
        .request(app)
        .get('/api/tratr');

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'Invalid User ID. Please enter a valid UUID V4.'
      );
    });

    it('should say user not found', async () => {
      const users = await User.findAll();
      const ids: string[] = [];
      users.forEach((user) => {
        ids.push(user.id);
      });
      const wronguuid = () => {
        const uuid = v4();
        if (ids.includes(uuid)) {
          wronguuid();
        } else {
          return uuid;
        }
      };

      const res = await chai
        .request(app)
        .get(`/api/${wronguuid()}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified ID'
      );
    });
  });

  describe('GET /api', () => {
    it('should get a Person by name', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .get(`/api?name=${user.name}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.Person).to.exist;
      expect(res.body.Person).to.be.an('object');
      const person = res.body.Person as User;
      expect(person.id).to.exist;
      expect(person.name).to.exist;
    });

    it('should say user not found', async () => {
      const res = await chai
        .request(app)
        .get(`/api?name=${v4()}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified name'
      );
    });

    it('should return home page', async () => {
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get('/api');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal('victornnamdii');
      expect(res.body.track).to.equal('backend');
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-2/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG/tree/main/backend/stage-2'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });

    it('should return home page, alt', async () => {
      const slack_name = 'hng';
      const track = 'backend';
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get(`/api?slack_name=${slack_name}&track=${track}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal(slack_name);
      expect(res.body.track).to.equal(track);
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-2/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG/tree/main/backend/stage-2'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });
  });

  describe('PATCH /api/:user_id', () => {
    it('should update a Person', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ occupation: 'Frontend Engineer' });

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Person successfully updated');
      expect(res.body.updates.occupation).to.equal('Frontend Engineer');
      expect(res.body.updates.email).to.equal(undefined);
      expect(res.body.updates.name).to.equal(undefined);
      expect(res.body.updates.age).to.equal(undefined);

      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser?.occupation).to.equal('Frontend Engineer');
    });

    it('should say email already exists', async () => {
      const user = await User.create(requestBody);
      const user2 = await User.create({
        email: 'test2@gmail.com',
        name: 'test2',
        age: '22'
      });

      const res = await chai
        .request(app)
        .patch(`/api/${user2.id}`)
        .send({ email: user.email });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email already exists');
    });

    it('should say invalid ID', async () => {
      const res = await chai
        .request(app)
        .patch('/api/tratra')
        .send({ occupation: 'Frontend Engineer' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'Invalid User ID. Please enter a valid UUID V4.'
      );
    });

    it('should say user not found', async () => {
      const users = await User.findAll();
      const ids: string[] = [];
      users.forEach((user) => {
        ids.push(user.id);
      });
      const wronguuid = () => {
        const uuid = v4();
        if (ids.includes(uuid)) {
          wronguuid();
        } else {
          return uuid;
        }
      };

      const res = await chai
        .request(app)
        .patch(`/api/${wronguuid()}`)
        .send({ occupation: 'Frontend Engineer' });

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified ID'
      );
    });

    it('should say email should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ email: true });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email should be a string');
    });

    it('should say enter a valid email', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ email: 'invalidemail' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid email');
    });

    it('should say age should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ age: 27 });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Age should be a string');
    });

    it('should say enter a valid age', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ age: '-27' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter a valid age, alt', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ age: '0' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter a valid age, alt 2', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ age: 'duba' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say occupation should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/${user.id}`)
        .send({ occupation: 29 });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Occupation should be a string');
    });
  });

  describe('PATCH /api?name=example_name', () => {
    it('should update a Person', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ occupation: 'Frontend Engineer' });

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Person successfully updated');
      expect(res.body.updates.occupation).to.equal('Frontend Engineer');
      expect(res.body.updates.email).to.equal(undefined);
      expect(res.body.updates.name).to.equal(undefined);
      expect(res.body.updates.age).to.equal(undefined);

      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser?.occupation).to.equal('Frontend Engineer');
    });

    it('should say email already exists', async () => {
      const user = await User.create(requestBody);
      const user2 = await User.create({
        email: 'test2@gmail.com',
        name: 'test2',
        age: '22'
      });

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user2.name}`)
        .send({ email: user.email });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email already exists');
    });

    it('should say user not found', async () => {
      const res = await chai
        .request(app)
        .patch('/api?name=yrrfkjhsbhj')
        .send({ occupation: 'Frontend Engineer' });

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified name'
      );
    });

    it('should say email should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ email: true });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Email should be a string');
    });

    it('should say enter a valid email', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ email: 'invalidemail' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid email');
    });

    it('should say age should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ age: 27 });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Age should be a string');
    });

    it('should say enter a valid age', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ age: '-27' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter a valid age, alt', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ age: '0' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say enter a valid age, alt 2', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ age: 'duba' });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Please enter a valid age');
    });

    it('should say occupation should be a string', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .patch(`/api/?name=${user.name}`)
        .send({ occupation: 29 });

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal('Occupation should be a string');
    });
  });

  describe('DELETE /api/:user_id', () => {
    it('should delete a Person', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .delete(`/api/${user.id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('test successfully deleted');

      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).to.equal(null);
    });

    it('should say invalid ID', async () => {
      const res = await chai
        .request(app)
        .delete('/api/tratra');

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'Invalid User ID. Please enter a valid UUID V4.'
      );
    });

    it('should say user not found', async () => {
      const users = await User.findAll();
      const ids: string[] = [];
      users.forEach((user) => {
        ids.push(user.id);
      });
      const wronguuid = () => {
        const uuid = v4();
        if (ids.includes(uuid)) {
          wronguuid();
        } else {
          return uuid;
        }
      };

      const res = await chai
        .request(app)
        .delete(`/api/${wronguuid()}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified ID'
      );
    });
  });

  describe('DELETE /api?name=example_name', () => {
    it('should delete a Person', async () => {
      const user = await User.create(requestBody);

      const res = await chai
        .request(app)
        .delete(`/api/?name=${user.name}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('test successfully deleted');

      const deletedUser = await User.findByPk(user.id);
      expect(deletedUser).to.equal(null);
    });

    it('should say user not found', async () => {
      const res = await chai
        .request(app)
        .delete('/api?name=jjsjjsjdjjf');

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal(
        'No user found with specified name'
      );
    });
  });
});