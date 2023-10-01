import request from 'supertest';
import {app} from '../src/server'; // import your Express app
import User from '../src/models/user';

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

describe('POST /register', () => {
  it('should create a new user and return a JWT token', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        role: 'Student',
        name: 'Test User'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });

  it('should return 400 if the email already exists', async () => {
    await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        role: 'Student',
        name: 'Test User'
      });

    const res = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        role: 'Student',
        name: 'Test User'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });
});

// Add similar tests for the login route