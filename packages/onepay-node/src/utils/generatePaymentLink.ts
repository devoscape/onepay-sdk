import crypto from "crypto";
import { PaymentLinkParams } from "../interfaces";

export function generatePaymentLink(
  paymentLinkParams: PaymentLinkParams,
): string {
  const { baseURL, salt, paymentParams } = paymentLinkParams;

  if (!baseURL) {
    throw new Error("Missing required parameter : BaseURL");
  }

  if (!salt) {
    throw new Error("Missing required parameter : Salt");
  }

  if (!paymentParams || typeof paymentParams !== "object") {
    throw new Error("Invalid or missing paymentParams. It must be an object.");
  }

  try {
    const paymentParamsString = JSON.stringify(paymentParams);

    // Generate hash
    const hash = crypto
      .createHash("sha256")
      .update(paymentParamsString + salt)
      .digest("hex");

    // Normalize base URL to remove trailing slash if exists
    const normalizeBaseURL = baseURL.endsWith("/")
      ? baseURL.slice(0, -1)
      : baseURL;

    const paymentLink = new URL(`${normalizeBaseURL}/request-payment-link/`);

    // append query parameters
    paymentLink.searchParams.append("hash", hash);

    return paymentLink.toString();
  } catch (error: unknown) {
    throw new Error(
      `Failed to generate payment link : ${error instanceof Error ? error.message : String(error)}`,
      {
        cause: error,
      },
    );
  }
}
