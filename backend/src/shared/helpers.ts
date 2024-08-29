import crypto from 'crypto';
import { Request } from 'express';

export const generateRandomString = (length: number) => {
  const byteLength = Math.ceil(length / 2);
  const randomBytes = crypto.randomBytes(byteLength).toString('hex');

  return randomBytes.slice(0, length);
};

export const getBearerTokenFromRequest = (req: Request) => {
  if (!req.headers) {
    return undefined;
  }

  const authHeader =
    req.headers['authorization'] || req.headers['proxy-authorization'];

  if (authHeader) {
    const tokens = authHeader.split(' ');
    return tokens[0] === 'Bearer' ? tokens[1] : undefined;
  }
  return undefined;
};
