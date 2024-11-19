import type {
  OnepayConfig,
  BasicPaymentParams,
  OnepayPaymentParams,
  PaymentResponse,
} from "./interfaces";

import { ENVIRONMENT_API } from "./constants/environment";
import { validatePaymentParams } from "./validation";
import { Currency } from "./constants";
import { paymentRequest } from "./api/requests";
import { generatePaymentLink } from "./utils";

export class Onepay {
  private appId: string;
  private token: string;
  private salt: string;
  private baseUrl: string;
  private paymentParams: OnepayPaymentParams | null;

  constructor(onepayConfig: OnepayConfig) {
    this.appId = onepayConfig.appId;
    this.token = onepayConfig.token;
    this.salt = onepayConfig.salt;
    this.baseUrl = ENVIRONMENT_API.LIVE;
    this.paymentParams = null;
  }

  public generatePaymentParams(
    basicParams: BasicPaymentParams
  ): OnepayPaymentParams {
    if (!this.appId) {
      throw new Error("App ID not initialized");
    }

    const validatedParams = validatePaymentParams(basicParams);

    const paymentDetailsWithAppId: OnepayPaymentParams = {
      amount: validatedParams.amount,
      reference: validatedParams.reference,
      customer_email: validatedParams.email,
      customer_first_name: validatedParams.firstName,
      customer_last_name: validatedParams.lastName,
      customer_phone_number: validatedParams.phone,
      transaction_redirect_url: validatedParams.transactionRedirectUrl,
      ...(validatedParams.additionalData && {
        additional_data: validatedParams.additionalData,
      }),
      currency: validatedParams.currency || Currency.LKR,
      app_id: this.appId,
    };

    this.paymentParams = paymentDetailsWithAppId;

    try {
      return this.paymentParams;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Failed to serialize payment: ${err.message}`);
      } else {
        throw new Error("Failed to serialize payment:");
      }
    }
  }

  public async createPaymentRequest(
    onepayPaymentParams: OnepayPaymentParams
  ): Promise<PaymentResponse> {
    try {
      const paymentRequestUrl = generatePaymentLink({
        baseURL: this.baseUrl,
        paymentParams: onepayPaymentParams,
        salt: this.salt,
      });

      const response = await paymentRequest(
        paymentRequestUrl,
        this.token,
        onepayPaymentParams
      );

      return response;
    } catch (err) {
      throw new Error("Failed to create payment request" + err);
    }
  }
}
