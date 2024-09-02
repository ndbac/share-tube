import { axiosInstance } from '@/services/axiosService';
import MockAdapter from 'axios-mock-adapter';

describe('axiosService', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    localStorage.clear();
  });

  afterEach(() => {
    mock.restore();
  });

  it('should inject token into request headers', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    mock.onGet('/test').reply(200);

    await axiosInstance.get('/test');

    const request = mock.history.get[0];
    expect(request?.headers?.Authorization).toBe(`Bearer ${token}`);
  });

  it('should refresh token on 400 InvalidToken error and retry the request', async () => {
    const oldToken = 'old-token';
    const oldRefreshToken = 'old-refresh-token';
    const newTokenData = { token: 'new-token', refreshToken: 'new-refresh-token' };

    localStorage.setItem('token', oldToken);
    localStorage.setItem('refreshToken', oldRefreshToken);

    mock.onPost('/user/refresh-token').reply(200, newTokenData);
    mock.onPost('/share').replyOnce(400, { errorCode: 'InvalidToken' }).onPost('/share').reply(200, { id: 1, title: 'Test Video' });

    const response = await axiosInstance.post('/share', { youtubeUrl: 'https://youtube.com/test-video' });

    expect(response.data).toEqual({ id: 1, title: 'Test Video' });
    expect(localStorage.getItem('token')).toBe(newTokenData.token);
    expect(localStorage.getItem('refreshToken')).toBe(newTokenData.refreshToken);

    const refreshRequest = mock.history.post.find(req => req.url === '/user/refresh-token');
    expect(refreshRequest?.data).toBe(JSON.stringify({ refreshToken: oldRefreshToken }));

    const retryRequest = mock.history.post.find(req => req.url === '/share' && req?.headers?.Authorization === `Bearer ${newTokenData.token}`);
    expect(retryRequest).toBeTruthy();
  });

  it('should remove tokens and redirect to login on refresh token failure', async () => {
    const oldToken = 'old-token';
    const oldRefreshToken = 'old-refresh-token';

    localStorage.setItem('token', oldToken);
    localStorage.setItem('refreshToken', oldRefreshToken);

    mock.onPost('/user/refresh-token').reply(400);
    mock.onPost('/share').replyOnce(400, { errorCode: 'InvalidToken' });

    await expect(axiosInstance.post('/share', { youtubeUrl: 'https://youtube.com/test-video' })).rejects.toThrow();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});
