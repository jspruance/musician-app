const request = require('supertest');
const store = require('../store/datastore');
const initialStoreData = require('../store/data');
const musicianRoutes = require('./musician');
const Musician = require('../models/musician');

beforeAll(done => {
  // initialize store
  musician = new Musician(store);
  musician.initStore(initialStoreData);
  done();
});

beforeEach(() => {
  server = require('../app');
});

afterEach(() => {
  server.close();
});

describe('Test suite for Musician store REST API', () => {

  test('Verify that store is initialized', () => {
    expect(musician).not.toBeNull();
    expect(musician).toBeInstanceOf(Musician);
  });

  test('It should fetch a musician via the GET method - success case', async () => {
    const res = await request(server).get('/musician/cobain');
    const responseBody = JSON.parse(res.text);
    expect(res.status).toEqual(200);
    expect(responseBody).not.toBeNull();
    expect(responseBody).toHaveProperty('firstName');
    expect(responseBody).toHaveProperty('lastName');
    expect(responseBody).toHaveProperty('genre');
  });

  test('It should fetch a musician via the GET method - error case', async () => {
    try {
      const res = await request(server).get('/musician/xxx');
    }catch(err) {
      expect(err).not.toBeNull();
      expect(err.toString()).toEqual('Error: Bad Request');
    }
  });

  test('It should add a new musician via the PUT method - success case', async () => {
    const newMusician = {
      firstName: "Bo",
      lastName: "Hansson",
      genre: "ROCK"
    };
    const res = await request(server).put('/musician/bo').send(newMusician);
    const responseBody = JSON.parse(res.text);
    expect(res.status).toEqual(200);
    expect(responseBody).not.toBeNull();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toEqual('bo');
  });

  test('It should modify an existing musician via the PUT method - success case', async () => {
    const musician = {
      firstName: "BB",
      lastName: "King",
      genre: "ROCK"
    };
    const res = await request(server).put('/musician/king').send(musician);
    const responseBody = JSON.parse(res.text);
    expect(res.status).toEqual(200);
    expect(responseBody).not.toBeNull();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toEqual('king');
  });

  test('It should add a new musician via the PUT method - error case (fails body validation)', async () => {
    const newMusician = {
      firstName: [],
      lastName: "Hansson",
      genre: "ROCK"
    };
    try {
      const res = await request(server).put('/musician/bo').send(newMusician);
    }catch(err) {
      expect(err).not.toBeNull();
    }
  });

});

