import { ILoginPayload, schema } from "@/app/login/schema";

describe("schema", () => {
  it("should validate a valid payload", async () => {
    const validPayload: ILoginPayload = {
      email: "john.doe@example.com",
      password: "password123",
    };

    await expect(schema.validate(validPayload)).resolves.toEqual(validPayload);
  });

  it("should invalidate a missing email", async () => {
    const invalidPayload = {
      password: "password123",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "Email is required"
    );
  });

  it("should invalidate an invalid email", async () => {
    const invalidPayload: ILoginPayload = {
      email: "invalid-email",
      password: "password123",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "Invalid email format"
    );
  });

  it("should invalidate a short password", async () => {
    const invalidPayload: ILoginPayload = {
      email: "john.doe@example.com",
      password: "123",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "Password must be at least 6 characters"
    );
  });

  it("should invalidate a missing password", async () => {
    const invalidPayload = {
      email: "john.doe@example.com",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "Password is required"
    );
  });
});
