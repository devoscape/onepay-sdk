import { describe, it, expect } from "vitest";
import { validatePaymentParams } from "../../validation/inputValidators";

describe("Payment Parameters Validation", () => {
  const validParams = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    amount: 500,
    reference: "TRANS_12345678",
    transactionRedirectUrl: "https://onpay.lk/redirect",
  };

  it("should validate correct payment parameters", () => {
    const result = validatePaymentParams(validParams);
    expect(result).toEqual(validParams);
  });

  it("should trim whitespace from parameters", () => {
    const paddedParams = {
      ...validParams,
      firstName: "  John  ",
      email: "  john.doe@example.com  ",
    };
    const result = validatePaymentParams(paddedParams);
    expect(result.firstName).toBe("John");
    expect(result.email).toBe("john.doe@example.com");
  });

  it("should throw error for invalid first name", () => {
    expect(() =>
      validatePaymentParams({ ...validParams, firstName: "" }),
    ).toThrow("First name must be a non-empty string");
  });

  it("should throw error for invalid last name", () => {
    expect(() =>
      validatePaymentParams({ ...validParams, lastName: "" }),
    ).toThrow("Last name must be a non-empty string");
  });

  it("should throw error for invalid email", () => {
    expect(() =>
      validatePaymentParams({ ...validParams, email: "invalid-email" }),
    ).toThrow("Email must be a valid email address");
  });

  it("should throw error for invalid phone number", () => {
    expect(() => validatePaymentParams({ ...validParams, phone: "" })).toThrow(
      "Phone number must be a string",
    );
  });

  it("should throw error for invalid amount", () => {
    expect(() => validatePaymentParams({ ...validParams, amount: 50 })).toThrow(
      "Amount must be a number greater than or equal to 100",
    );
  });

  it("should fix the amount to 2 decimal places", () => {
    const result = validatePaymentParams({ ...validParams, amount: 150.522 });
    expect(result.amount).toBe(150.52);
  });

  it("should throw error for invalid reference", () => {
    expect(() =>
      validatePaymentParams({ ...validParams, reference: "123" }),
    ).toThrow("Reference must be 10-20 characters long");
  });

  it("should throw error for invalid redirect URL", () => {
    expect(() =>
      validatePaymentParams({
        ...validParams,
        transactionRedirectUrl: "invalid-url",
      }),
    ).toThrow("Invalid transaction redirect URL");
  });
});
