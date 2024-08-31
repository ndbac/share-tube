import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { createRequestFunction, initTestApp } from 'test/tests.helpers';
import { UserRecord } from 'src/modules/users/user.entity';

const mockUser = {
  name: 'string',
  email: 'string@gmail.com',
  password: 'string123',
};

let credential: {
  token: string;
  refreshToken: string;
};

describe('user refresh account token e2e', () => {
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

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const response = await request(`/user/register`, {
      expected: HttpStatus.CREATED,
      method: 'post',
      body: mockUser,
    });
    credential = response.body.credential;
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  describe('happy path', () => {
    it('user successfully refresh token', async () => {
      const res = await request(`/user/refresh-token`, {
        expected: 201,
        method: 'post',
        body: {
          refreshToken: credential.refreshToken,
        },
        accessToken: credential.token,
      });
      expect(res.body.token).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
    });
  });

  describe('negative path', () => {
    it('user failed to refresh token because it was used before', async () => {
      const res = await request(`/user/refresh-token`, {
        expected: 201,
        method: 'post',
        body: {
          refreshToken: credential.refreshToken,
        },
        accessToken: credential.token,
      });
      expect(res.body.token).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();

      const secondRes = await request(`/user/refresh-token`, {
        expected: HttpStatus.FORBIDDEN,
        method: 'post',
        body: {
          refreshToken: 'invalid refresh token',
        },
        accessToken: credential.token,
      });
      expect(secondRes.body).toEqual({
        error: 'Forbidden',
        message: 'Invalid token',
        statusCode: 403,
      });
    });

    it('user failed to refresh token because of invalid refresh token', async () => {
      const res = await request(`/user/refresh-token`, {
        expected: HttpStatus.FORBIDDEN,
        method: 'post',
        body: {
          refreshToken: 'invalid refresh token',
        },
        accessToken: credential.token,
      });
      expect(res.body).toEqual({
        error: 'Forbidden',
        message: 'Invalid token',
        statusCode: 403,
      });
    });
  });
});
