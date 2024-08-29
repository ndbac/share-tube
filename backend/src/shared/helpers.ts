import crypto from 'crypto';

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};
