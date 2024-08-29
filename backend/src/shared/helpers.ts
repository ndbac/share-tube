import crypto from 'crypto';

export const generateRandomString = (length: number) => {
  const byteLength = Math.ceil(length / 2);
  const randomBytes = crypto.randomBytes(byteLength).toString('hex');

  return randomBytes.slice(0, length);
};
