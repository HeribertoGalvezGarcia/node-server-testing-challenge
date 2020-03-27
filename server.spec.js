const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return an OK status code', async () => {
      const response = await request(server).get('/');

      expect(response.status).toEqual(200);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });

  describe('GET /:id', () => {
    it('should return an OK status code', async () => {
      const response = await request(server).get('/1');

      expect(response.status).toEqual(200);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).get('/1');

      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST /', () => {
    it('should return an OK status code', async () => {
      const response = await request(server).post('/').send({name: 'test', bio: 'test'});

      expect(response.status).toEqual(201);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).post('/').send({name: 'test', bio: 'test'});

      expect(response.type).toEqual('application/json');
    });
  });

  describe('DELETE /:id', () => {
    it('should return an OK status code', async () => {
      const response = await request(server).delete('/1');

      expect(response.status).toEqual(200);
    });

    it('should return a JSON object', async () => {
      const response = await request(server).delete('/1');

      expect(response.type).toEqual('application/json');
    });
  });
});
