import { CurrencyType } from "../constants";

export interface OnepayConfig {
  token: string;
  appId: string;
  salt: string;
}

export interface BasicPaymentParams {
  amount: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  currency?: CurrencyType;
  reference: string;
  transactionRedirectUrl: string;
  additionalData?: string;
}

export interface OnepayPaymentParams {
  amount: number;
  app_id: string;
  reference: string;
  currency?: CurrencyType;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone_number: string;
  customer_email: string;
  transaction_redirect_url: string;
  additional_data?: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: {
    ipg_transaction_id: string;
    amount: {
      gross_amount: number;
      discount: number;
      handling_fee: number;
      net_amount: number;
      currency: string;
    };
    gateway: {
      redirect_url: string;
    };
  };
}

export interface CallbackResponse {
  status: number;
  transaction_id: string;
  status_message: string;
  additional_data: string;
}
