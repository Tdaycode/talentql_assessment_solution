const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const app = require('../../app');
const auth = require('../../middleware/auth');
const ApiError = require('../../utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const User = require('../../models/user.model');
const { userOne, insertUsers } = require('../integration/fixtures/user.fixture');
const { userOneAccessToken } = require('../integration/fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  describe('POST /api/v1/auth/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        firstName: faker.name.firstName(), 
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.phoneNumber(),
        password: 'password1'
      };
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';

      await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password';

      await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);

      newUser.password = '11111111';

      await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.BAD_REQUEST);
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app).post('/api/v1/auth/register').send(newUser).expect(httpStatus.CREATED);

      const dbUser = await User.findById(res.body.user._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        login: userOne.email,
        password: userOne.password,
      };

      const res = await request(app).post('/api/v1/auth/login').send(loginCredentials).expect(httpStatus.OK);

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test('should return 401 error if there are no users with that email', async () => {
      const loginCredentials = {
        login: userOne.email,
        password: userOne.password,
      };

      const res = await request(app).post('/api/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect login or password' });
    });

    test('should return 401 error if password is wrong', async () => {
      await insertUsers([userOne]);
      const loginCredentials = {
        login: userOne.email,
        password: 'wrongPassword1',
      };

      const res = await request(app).post('/api/v1/auth/login').send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({ code: httpStatus.UNAUTHORIZED, message: 'Incorrect login or password' });
    });
  });
});
  
describe('Auth middleware', () => {
  test('should call next with unauthorized error if access token is not found in header', async () => {
    await insertUsers([userOne]);
    const req = httpMocks.createRequest();
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
    );
  });

  test('should call next with unauthorized error if access token is not a valid jwt token', async () => {
    await insertUsers([userOne]);
    const req = httpMocks.createRequest({ headers: { Authorization: 'Bearer randomToken' } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
    );
  });

  test('should call next with unauthorized error if user is not found', async () => {
    const req = httpMocks.createRequest({ headers: { Authorization: `Bearer ${userOneAccessToken}` } });
    const next = jest.fn();

    await auth()(req, httpMocks.createResponse(), next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ statusCode: httpStatus.UNAUTHORIZED, message: 'Please authenticate' })
    );
  });
});
