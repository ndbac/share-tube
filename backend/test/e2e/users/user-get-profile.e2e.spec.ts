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

describe('user get account profile e2e', () => {
  let app: INestApplication;
  let request: ReturnType<typeof createRequestFunction>;
  let dataSource: DataSource;
  let userRepository: Repository<UserRecord>;

  beforeAll(async () => {
    ({ app } = await initTestApp());
    request = createRequestFunction(app);

    const response = await request(`/user/register`, {
      expected: HttpStatus.CREATED,
      method: 'post',
      body: mockUser,
    });
    credential = response.body.credential;

    dataSource = app.get<DataSource>(DataSource);
    userRepository = dataSource.getRepository(UserRecord);
  });

  afterAll(async () => {
    await userRepository.delete({});
    await app.close();
  });

  describe('happy path', () => {
    it('user get profile successfully', async () => {
      const res = await request(`/user/profile`, {
        expected: 200,
        method: 'get',
        accessToken: credential.token,
      });
      expect(res.body.name).toEqual(mockUser.name);
      expect(res.body.email).toEqual(mockUser.email);
    });
  });

  describe('negative path', () => {
    it('user failed to get profile because of invalid token', async () => {
      const res = await request(`/user/profile`, {
        expected: HttpStatus.BAD_REQUEST,
        method: 'get',
        accessToken: 'invalid token',
      });
      expect(res.body).toEqual({
        message: 'Invalid token',
        errorCode: 'InvalidToken',
      });
    });
  });
});
