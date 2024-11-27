import { describe, it, expect } from "vitest";
import { isValidEmail } from "../../validation/emailValidator";

describe("isValidEmail", () => {
  it("should return true for a valid email", () => {
    expect(isValidEmail("example@example.com")).toBe(true);
  });
  it("should return false for an invalid email without an '@' symbol", () => {
    expect(isValidEmail("example.com")).toBe(false);
  });
  it("should return false for an invalid email with a space", () => {
    expect(isValidEmail("example example.com")).toBe(false);
  });
  it("should return false for an invalid email with a '.' before the '@' symbol", () => {
    expect(isValidEmail("@example.com")).toBe(false);
  });
  it("should return false for an invalid email with a '.' after the '@' symbol", () => {
    expect(isValidEmail("example@.com")).toBe(false);
  });
  it("should return false for an invalid email with a '.' in the middle of the email", () => {
    expect(isValidEmail("example.com@example")).toBe(false);
  });
});
