import { describe, it, expect } from "vitest";
import crypto from "crypto";
import { generatePaymentLink } from "../../utils/generate-payment-link";
import { ENVIRONMENT_API } from "../../constants";
import { PaymentLinkParams } from "../../interfaces";

describe("generatePaymentLink", () => {
  // Valid input test case
  it("should generate a valid payment link with correct hash", () => {
    const paymentLinkParams: PaymentLinkParams = {
      baseURL: ENVIRONMENT_API.LIVE,
      salt: "test-salt",
      paymentParams: {
        app_id: "123",
        amount: 100,
        customer_email: "onepay@example.com",
        customer_first_name: "john",
        customer_last_name: "doe",
        customer_phone_number: "+94701234567",
        reference: "581231123121311231",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    };

    const result = generatePaymentLink(paymentLinkParams);

    // Verify base URL
    expect(result).toContain(`${ENVIRONMENT_API.LIVE}/request-payment-link`);

    // Verify hash generation
    const paymentParamsString = JSON.stringify(paymentLinkParams.paymentParams);
    const expectedHash = crypto
      .createHash("sha256")
      .update(paymentParamsString + "test-salt")
      .digest("hex");

    expect(result).toContain(`hash=${expectedHash}`);
  });

  // Missing parameters test cases
  it("should throw an error when baseURL is missing", () => {
    const paymentLinkParams = {
      salt: "test-salt",
      paymentParams: {
        app_id: "123",
        amount: 100,
        customer_email: "onepay@example.com",
        customer_first_name: "john",
        customer_last_name: "doe",
        customer_phone_number: "+94701234567",
        reference: "581231123121311231",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    } as any;

    expect(() => generatePaymentLink(paymentLinkParams)).toThrow(
      "Missing required parameter : BaseURL",
    );
  });

  it("should throw an error when salt is missing", () => {
    const paymentLinkParams = {
      baseURL: ENVIRONMENT_API.LIVE,
      paymentParams: {
        app_id: "123",
        amount: 100,
        customer_email: "onepay@example.com",
        customer_first_name: "john",
        customer_last_name: "doe",
        customer_phone_number: "+94701234567",
        reference: "581231123121311231",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    } as any;

    expect(() => generatePaymentLink(paymentLinkParams)).toThrow(
      "Missing required parameter : Salt",
    );
  });

  it("should throw an error when paymentParams are missing", () => {
    const paymentLinkParams = {
      baseURL: ENVIRONMENT_API.LIVE,
      salt: "test-salt",
    } as any;

    expect(() => generatePaymentLink(paymentLinkParams)).toThrow(
      "Invalid or missing paymentParams. It must be an object.",
    );
  });

  // Different input variations
  it("should work with different payment parameter structures", () => {
    const paymentLinkParams = {
      baseURL: "https://example.com",
      salt: "unique-salt",
      paymentParams: {
        app_id: "123",
        amount: 100,
        customer_email: "onepay@example.com",
        customer_first_name: "john",
        customer_last_name: "doe",
        customer_phone_number: "+94701234567",
        reference: "581231123121311231",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    };

    const result = generatePaymentLink(paymentLinkParams);
    expect(result).toMatch(
      /^https:\/\/example\.com\/request-payment-link\/\?hash=[0-9a-f]{64}$/,
    );
  });

  // Hash uniqueness test
  it("should generate different hashes for different inputs", () => {
    const params1 = {
      baseURL: ENVIRONMENT_API.LIVE,
      salt: "salt1",
      paymentParams: {
        app_id: "123",
        amount: 100,
        customer_email: "onepay@example.com",
        customer_first_name: "john",
        customer_last_name: "doe",
        customer_phone_number: "+94701234567",
        reference: "581231123121311231",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    };

    const params2 = {
      baseURL: ENVIRONMENT_API.LIVE,
      salt: "salt2",
      paymentParams: {
        app_id: "123",
        amount: 1000,
        customer_email: "iro@example.com",
        customer_first_name: "iro",
        customer_last_name: "pra",
        customer_phone_number: "+94701234567",
        reference: "581231123121311232",
        transaction_redirect_url: "http://localhost:3000/checkout",
      },
    };

    const link1 = generatePaymentLink(params1);
    const link2 = generatePaymentLink(params2);

    expect(link1).not.toEqual(link2);
  });
});
