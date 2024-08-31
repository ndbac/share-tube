import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { createRequestFunction, initTestApp } from 'test/tests.helpers';
import { UserRecord } from 'src/modules/users/user.entity';
import { YoutubeService } from 'src/adapters/youtube/youtube.service';
import { ShareRecord } from 'src/modules/shares/shares.entity';

const mockUser = {
  name: 'string',
  email: 'string@gmail.com',
  password: 'string123',
};

let credential: {
  token: string;
  refreshToken: string;
};

let youtubeGetMetadataSpy: jest.SpyInstance;

describe('user shares a video e2e', () => {
  let app: INestApplication;
  let request: ReturnType<typeof createRequestFunction>;
  let dataSource: DataSource;
  let userRepository: Repository<UserRecord>;
  let shareRepository: Repository<ShareRecord>;
  let youtubeService: YoutubeService;

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
    youtubeService = app.get<YoutubeService>(YoutubeService);
    userRepository = dataSource.getRepository(UserRecord);
    shareRepository = dataSource.getRepository(ShareRecord);

    youtubeGetMetadataSpy = jest
      .spyOn(youtubeService, 'getVideoMetadata')
      .mockResolvedValue({
        items: [
          {
            snippet: {
              title: 'title',
              description: 'description',
            },
          },
        ],
      });
  });

  afterAll(async () => {
    await shareRepository.delete({});
    await userRepository.delete({});
    await app.close();
  });

  describe('happy path', () => {
    it('user share a new video successfully', async () => {
      const res = await request(`/share`, {
        expected: 201,
        method: 'post',
        body: {
          youtubeUrl: 'https://www.youtube.com/watch?v=Y1cCnVQHwzE',
        },
        accessToken: credential.token,
      });
      expect(youtubeGetMetadataSpy).toBeCalledTimes(1);
      expect(youtubeGetMetadataSpy).toBeCalledWith('Y1cCnVQHwzE');
      expect(res.body.title).toEqual('title');
      expect(res.body.description).toEqual('description');
    });
  });

  describe('negative path', () => {
    it('user failed to share video because of invalid token', async () => {
      const res = await request(`/share`, {
        expected: HttpStatus.BAD_REQUEST,
        method: 'post',
        body: {
          youtubeUrl: 'https://www.youtube.com/watch?v=Y1cCnVQHwzE',
        },
        accessToken: 'invalid token',
      });
      expect(res.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('user failed to share video because of invalid youtube url', async () => {
      const res = await request(`/share`, {
        expected: HttpStatus.BAD_REQUEST,
        method: 'post',
        body: {
          youtubeUrl: 'invalid url',
        },
        accessToken: credential.token,
      });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message: ['youtubeUrl must be a URL address'],
        statusCode: 400,
      });
    });

    it('user failed to share video because there is no video ID in url', async () => {
      const res = await request(`/share`, {
        expected: HttpStatus.BAD_REQUEST,
        method: 'post',
        body: {
          youtubeUrl: 'https://www.youtube.com/watch?v=',
        },
        accessToken: credential.token,
      });
      expect(res.body).toEqual({
        error: 'Bad Request',
        message:
          'Failed to parse Youtube ID from URL: https://www.youtube.com/watch?v=',
        statusCode: 400,
      });
    });
  });
});
