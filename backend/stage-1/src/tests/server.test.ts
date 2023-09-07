import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../server';
import days from '../utils/date';

chai.use(chaiHttp);

describe('Server Tests', () => {
  describe('GET /api', () => {
    it('should return required information correctly', async () => {
      const slack_name = 'hng';
      const track = 'backend';
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get(`/api?slack_name=${slack_name}&track=${track}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal(slack_name);
      expect(res.body.track).to.equal(track);
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-1/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });

    it('should throw error if missing required fields', async () => {
      const slack_name = 'hng';
      // const track = 'backend';
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get(`/api?slack_name=${slack_name}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal(slack_name);
      expect(res.body.track).to.equal('Missing query parameter \'track\'');
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-1/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });

    it('should throw error if missing required fields, alt', async () => {
      // const slack_name = 'hng';
      const track = 'backend';
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get(`/api?track=${track}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal('Missing query parameter \'slack_name\'');
      expect(res.body.track).to.equal(track);
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-1/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });

    it('should throw error if missing required fields, alt 2', async () => {
      const current_day = days[new Date().getDay() as keyof typeof days];

      const res = await chai.request(app).get('/api');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.slack_name).to.equal('Missing query parameter \'slack_name\'');
      expect(res.body.track).to.equal('Missing query parameter \'track\'');
      expect(res.body.github_file_url).to.equal(
        'https://github.com/victornnamdii/HNG/blob/main/backend/stage-1/src/server.ts'
      );
      expect(res.body.github_repo_url).to.equal(
        'https://github.com/victornnamdii/HNG'
      );
      expect(res.body.status_code).to.equal(200);
      expect(res.body.current_day).to.equal(current_day);
      expect(res.body.utc_time).to.be.a('string');
    });
  });
});