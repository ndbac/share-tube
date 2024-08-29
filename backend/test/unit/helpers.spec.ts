import { generateRandomString } from 'src/shared/helpers';

describe('generateRandomString', () => {
  it('should generate random string with correct legnth', () => {
    const random = generateRandomString(3);
    expect(random.length).toStrictEqual(3);
  });

  it('should generate random string with legnth 0', () => {
    const random = generateRandomString(0);
    expect(random.length).toStrictEqual(0);
  });

  it('should generate random string with length = 0 if input length is negative number', () => {
    const random = generateRandomString(-1);
    expect(random.length).toStrictEqual(0);
  });
});
