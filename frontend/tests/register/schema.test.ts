import { IRegisterAccountPayload, schema } from "@/app/register/schema";

describe('schema', () => {
  it('should validate a valid payload', async () => {
    const validPayload: IRegisterAccountPayload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await expect(schema.validate(validPayload)).resolves.toEqual(validPayload);
  });

  it('should invalidate a missing name', async () => {
    const invalidPayload = {
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow('Name is required');
  });

  it('should invalidate an invalid email', async () => {
    const invalidPayload: IRegisterAccountPayload = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow('Invalid email format');
  });

  it('should invalidate a short password', async () => {
    const invalidPayload: IRegisterAccountPayload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123',
      confirmPassword: '123',
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow('Password must be at least 6 characters');
  });

  it('should invalidate mismatched passwords', async () => {
    const invalidPayload: IRegisterAccountPayload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow('Passwords must match');
  });

  it('should invalidate a missing confirmPassword', async () => {
    const invalidPayload = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow('Confirm Password is required');
  });
});