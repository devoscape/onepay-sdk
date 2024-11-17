import crypto from "node:crypto";
import { OnepayPaymentParams } from "../interfaces";

interface PaymentLinkParams {
  salt: string;
  baseURL: string;
  paymentParams: OnepayPaymentParams;
}

export function generatePaymentLink(
  paymentLinkParams: PaymentLinkParams
): string {
  try {
    const { baseURL, salt, paymentParams } = paymentLinkParams;

    // Validate inputs
    if (!baseURL || !salt || !paymentParams) {
      throw new Error("Missing required parameters");
    }

    const paymentParamsString = JSON.stringify(paymentParams);

    // Generate hash
    const hash = crypto
      .createHash("sha256")
      .update(paymentParamsString + salt)
      .digest("hex");

    return `${baseURL}/request-payment-link/?hash=${hash}`;
  } catch (error) {
    throw new Error("Generating the payment request link failed");
  }
}
