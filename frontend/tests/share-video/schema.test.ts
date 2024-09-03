import { IShareVideoPayload, schema } from "@/app/share-video/schema";

describe("schema", () => {
  it("should validate a valid YouTube URL", async () => {
    const validPayload: IShareVideoPayload = {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    };

    await expect(schema.validate(validPayload)).resolves.toEqual(validPayload);
  });

  it("should invalidate an invalid YouTube URL", async () => {
    const invalidPayload: IShareVideoPayload = {
      youtubeUrl: "invalid-url",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "Invalid URL"
    );
  });

  it("should invalidate an empty YouTube URL", async () => {
    const invalidPayload: IShareVideoPayload = {
      youtubeUrl: "",
    };

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "YouTube URL is required"
    );
  });

  it("should invalidate a missing YouTube URL", async () => {
    const invalidPayload = {};

    await expect(schema.validate(invalidPayload)).rejects.toThrow(
      "YouTube URL is required"
    );
  });
});
