import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { createRequestFunction, initTestApp } from 'test/tests.helpers';
import { UserRecord } from 'src/modules/users/user.entity';
import { ShareRecord } from 'src/modules/shares/shares.entity';

const mockUser = {
  name: 'string',
  email: 'string@gmail.com',
  password: 'string123',
};

let userId: string;
let shareRepositorySpy: jest.SpyInstance;

describe('user filter shares e2e', () => {
  let app: INestApplication;
  let request: ReturnType<typeof createRequestFunction>;
  let dataSource: DataSource;
  let userRepository: Repository<UserRecord>;
  let shareRepository: Repository<ShareRecord>;

  beforeAll(async () => {
    ({ app } = await initTestApp());
    request = createRequestFunction(app);

    const response = await request(`/user/register`, {
      expected: HttpStatus.CREATED,
      method: 'post',
      body: mockUser,
    });
    userId = response.body.id;

    dataSource = app.get<DataSource>(DataSource);
    userRepository = dataSource.getRepository(UserRecord);
    shareRepository = dataSource.getRepository(ShareRecord);

    await shareRepository.save([
      {
        userId,
        title: 'Title 1',
        description: 'Description 1',
        youtubeId: '1',
      },
      {
        userId,
        title: 'Title 2',
        description: 'Description 2',
        youtubeId: '2',
      },
      {
        userId,
        title: 'Title 3',
        description: 'Description 3',
        youtubeId: '3',
      },
      {
        userId,
        title: 'Title 4',
        description: 'Description 4',
        youtubeId: '4',
      },
    ]);
  });

  afterAll(async () => {
    await shareRepository.delete({});
    await userRepository.delete({});
    await app.close();
  });

  describe('happy path', () => {
    it('user filters shares successfully', async () => {
      const res = await request(`/share/filter`, {
        expected: 200,
        method: 'get',
      });
      expect(res.body.length).toEqual(4);
    });

    it('user filters shares successfully with pagination', async () => {
      const res = await request(`/share/filter?page=2&pageSize=3`, {
        expected: 200,
        method: 'get',
      });
      expect(res.body.length).toEqual(1);
    });
  });

  describe('negative path', () => {
    it('user failed to filter shares because of db error', async () => {
      const mockError = new Error('error');

      shareRepositorySpy = jest
        .spyOn(shareRepository, 'findAndCount')
        .mockRejectedValue(mockError);

      const res = await request(`/share/filter`, {
        expected: 500,
        method: 'get',
      });
      expect(res.body).toEqual({
        message: 'Internal server error',
        statusCode: 500,
      });
      expect(shareRepositorySpy).toBeCalledTimes(1);
    });
  });
});
