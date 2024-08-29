import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { createRequestFunction, initTestApp } from 'test/tests.helpers';
import { UserRecord } from 'src/modules/users/user.entity';

const mockUser = {
  name: 'string',
  email: 'string@gmail.com',
  password: 'string123',
};

describe('user login account e2e', () => {
  let app: INestApplication;
  let request: ReturnType<typeof createRequestFunction>;
  let dataSource: DataSource;
  let userRepository: Repository<UserRecord>;

  beforeAll(async () => {
    ({ app } = await initTestApp());
    request = createRequestFunction(app);

    await request(`/user/register`, {
      expected: HttpStatus.CREATED,
      method: 'post',
      body: mockUser,
    });

    dataSource = app.get<DataSource>(DataSource);
    userRepository = dataSource.getRepository(UserRecord);
  });

  afterAll(async () => {
    await userRepository.delete({});
    await app?.close();
  });

  describe('happy path', () => {
    it('user successfully login', async () => {
      const body = {
        name: 'string',
        email: 'string@gmail.com',
        password: 'string123',
      };
      const res = await request(`/user/login`, {
        expected: 201,
        method: 'post',
        body: {
          email: mockUser.email,
          password: mockUser.password,
        },
      });
      expect(res.body.email).toEqual(body.email);
      expect(res.body.name).toEqual(body.name);
    });
  });

  describe('negative path', () => {
    it('user failed to login because of invalid credential', async () => {
      const res = await request(`/user/login`, {
        expected: HttpStatus.FORBIDDEN,
        method: 'post',
        body: {
          email: mockUser.email,
          password: 'testPass',
        },
      });
      expect(res.body).toEqual({
        error: 'Forbidden',
        message: 'Invalid email or password',
        statusCode: 403,
      });
    });
  });
});
