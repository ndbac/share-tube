import bcrypt from 'bcryptjs';
import config from 'config';
import { BcryptService } from 'src/modules/common/bcrypt/bcrypt.service';

jest.mock('bcryptjs');
jest.mock('config');

describe('BcryptService', () => {
  let bcryptService: BcryptService;

  beforeEach(() => {
    bcryptService = new BcryptService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('should hash the raw text successfully', async () => {
      const rawText = 'password';
      const salt = 'salt';
      const hashedText = 'hashedText';

      (config.get as jest.Mock).mockReturnValue(10);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedText);

      const result = await bcryptService.hash(rawText);

      expect(config.get).toHaveBeenCalledWith('bcrypt.saltRoundQuantity');
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(rawText, salt);
      expect(result).toBe(hashedText);
    });
  });

  describe('compare', () => {
    it('should compare raw text and hashed text successfully', async () => {
      const rawText = 'password';
      const hashedText = 'hashedText';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await bcryptService.compare(rawText, hashedText);

      expect(bcrypt.compare).toHaveBeenCalledWith(rawText, hashedText);
      expect(result).toBe(true);
    });

    it('should return false if comparison fails', async () => {
      const rawText = 'password';
      const hashedText = 'hashedText';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await bcryptService.compare(rawText, hashedText);

      expect(bcrypt.compare).toHaveBeenCalledWith(rawText, hashedText);
      expect(result).toBe(false);
    });
  });
});
