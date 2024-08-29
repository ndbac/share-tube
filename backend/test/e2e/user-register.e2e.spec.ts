import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { createRequestFunction, initTestApp } from 'test/tests.helpers';
import { UserRecord } from 'src/modules/users/user.entity';

describe('user register account e2e', () => {
  let app: INestApplication;
  let request: ReturnType<typeof createRequestFunction>;
  let dataSource: DataSource;
  let userRepository: Repository<UserRecord>;

  beforeAll(async () => {
    ({ app } = await initTestApp());
    request = createRequestFunction(app);

    dataSource = app.get<DataSource>(DataSource);
    userRepository = dataSource.getRepository(UserRecord);
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app?.close();
  });

  describe('happy path', () => {
    it('user successfully registers', async () => {
      const body = {
        name: 'string',
        email: 'string@gmail.com',
        password: 'string123',
      };
      const res = await request(`/user/register`, {
        expected: HttpStatus.CREATED,
        method: 'post',
        body,
      });
      expect(res.body.email).toEqual(body.email);
      expect(res.body.name).toEqual(body.name);
    });
  });

  describe('negative path', () => {
    it('user failed to register because of invalid payload', async () => {
      const body = {
        name: 'string',
        email: 'not-an-email',
        password: 'string123',
      };
      const res = await request(`/user/register`, {
        expected: HttpStatus.BAD_REQUEST,
        method: 'post',
        body,
      });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: ['email must be an email'],
        statusCode: 400,
      });
    });

    it('user failed to register because of duplicated email', async () => {
      const body = {
        name: 'string',
        email: 'string@gmail.com',
        password: 'string123',
      };
      const res = await request(`/user/register`, {
        expected: HttpStatus.CREATED,
        method: 'post',
        body,
      });
      expect(res.body.email).toEqual(body.email);
      expect(res.body.name).toEqual(body.name);

      const secondRes = await request(`/user/register`, {
        expected: HttpStatus.FORBIDDEN,
        method: 'post',
        body,
      });
      expect(secondRes.body).toEqual({
        error: 'Forbidden',
        message: 'User with email: string@gmail.com already exists',
        statusCode: 403,
      });
    });
  });
});
