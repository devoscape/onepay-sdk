export class PaymentException extends Error {
  constructor(message: string) {
    super(message);

    this.name = "PaymentError";
    this.message = message;
  }
}
