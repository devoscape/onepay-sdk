import { describe, it, expect } from "vitest";
import { isValidUrl } from "../../validation/urlValidator";

describe("URL Validation", () => {
  it("should validate URLs correctly", () => {
    expect(isValidUrl("https://onepay.lk")).toBe(true);
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("invalid-url")).toBe(false);
    expect(isValidUrl("localhost:8000/app")).toBe(false);
    expect(isValidUrl("http://localhost:8000/app")).toBe(true);
    expect(isValidUrl("")).toBe(false);
  });
});
