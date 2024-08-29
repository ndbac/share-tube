import jwt from 'jsonwebtoken';
import config from 'config';
import { JwtService } from 'src/modules/common/jsonwebtoken/jwt.service';
import { BadRequestException } from '@nestjs/common';

jest.mock('jsonwebtoken');
jest.mock('config');

describe('JwtService', () => {
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signToken', () => {
    it('should sign a token with the correct data', () => {
      const data = { userId: 1 };
      const token = 'signedToken';
      const expiresIn = '1h';

      (config.get as jest.Mock)
        .mockReturnValueOnce('secretKey')
        .mockReturnValueOnce('subject')
        .mockReturnValueOnce('audience')
        .mockReturnValueOnce(expiresIn);

      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = jwtService.signToken(data, expiresIn);

      expect(result).toBe(token);
    });

    it('should use default expiration time if not provided', () => {
      const data = { userId: 1 };
      const token = 'signedToken';

      (config.get as jest.Mock)
        .mockReturnValueOnce('secretKey')
        .mockReturnValueOnce('subject')
        .mockReturnValueOnce('audience')
        .mockReturnValueOnce('1h');

      (jwt.sign as jest.Mock).mockReturnValue(token);

      const result = jwtService.signToken(data);

      expect(jwt.sign).toHaveBeenCalledWith({ data }, 'secretKey', {
        expiresIn: '1h',
        subject: 'subject',
        audience: 'audience',
      });
      expect(result).toBe(token);
    });
  });

  describe('verifyToken', () => {
    it('should verify a token successfully', () => {
      const token = 'validToken';
      const decoded = { data: 'decodedData' };

      (jwt.verify as jest.Mock).mockReturnValue(decoded);

      const result = jwtService.verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(token, 'secretKey', {
        subject: 'subject',
        audience: 'audience',
      });
      expect(result).toBe(decoded);
    });

    it('should throw BadRequestException if token is invalid and ignoreError is false', () => {
      const token = 'invalidToken';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => jwtService.verifyToken(token)).toThrow(BadRequestException);
    });

    it('should not throw an error if token is invalid and ignoreError is true', () => {
      const token = 'invalidToken';

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = jwtService.verifyToken(token, { ignoreError: true });

      expect(result).toBeUndefined();
    });
  });

  describe('decodeToken', () => {
    it('should decode a token successfully', () => {
      const token = 'token';
      const decoded = { data: 'decodedData' };

      (jwt.decode as jest.Mock).mockReturnValue(decoded);

      const result = jwtService.decodeToken(token);

      expect(jwt.decode).toHaveBeenCalledWith(token);
      expect(result).toBe(decoded);
    });

    it('should throw BadRequestException if decoding fails and ignoreError is false', () => {
      const token = 'token';

      (jwt.decode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => jwtService.decodeToken(token)).toThrow(BadRequestException);
    });

    it('should not throw an error if decoding fails and ignoreError is true', () => {
      const token = 'token';

      (jwt.decode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = jwtService.decodeToken(token, { ignoreError: true });

      expect(result).toBeUndefined();
    });
  });
});
