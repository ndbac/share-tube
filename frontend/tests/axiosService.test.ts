import { axiosInstance } from '@/services/axiosService';
import MockAdapter from 'axios-mock-adapter';

describe('axiosService', () => {
  let mock: MockAdapter;
  const originalLocation = window.location;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    localStorage.clear();
    window.location = { ...originalLocation, href: 'https://github.com/testing' };
  });

  afterEach(() => {
    mock.restore();
    window.location = originalLocation;
  });

  it('should inject token into request headers', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    mock.onGet('/test').reply(200);

    await axiosInstance.get('/test');

    const request = mock.history.get[0];
    expect(request?.headers?.Authorization).toBe(`Bearer ${token}`);
  });
});