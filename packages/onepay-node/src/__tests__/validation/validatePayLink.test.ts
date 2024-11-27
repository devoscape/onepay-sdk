import { describe, it, expect } from "vitest";
import { validatePayLink } from "../../validation/validatePayLink";

describe("Pay Link Validation", () => {
  it("should validate URLs with hash parameter", () => {
    const validUrl = "https://example.com/?hash=123";
    const result = validatePayLink(validUrl);
    expect(result.toString()).toBe(validUrl);
  });

  it("should throw error for URLs without HTTPS", () => {
    expect(() => validatePayLink("http://onepay.lk")).toThrow(
      "URL must use HTTPS Protocol",
    );
  });

  it("should throw error for URLs without hash", () => {
    expect(() => validatePayLink("https://onepay.lk")).toThrow(
      "Missing salt query parameter",
    );
  });
});
