import { PaymentException } from "../exceptions/PaymentException";
import { BasicPaymentParams } from "../interfaces";

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error: unknown) {
    return false;
  }
}

function isValidEmail(email: string) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  // Check if '@' exists and is not at the start or end
  if (atIndex < 1 || atIndex === email.length - 1) {
    return false;
  }

  // Check if a '.' exists after the '@' symbol
  if (dotIndex < atIndex + 2 || dotIndex === email.length - 1) {
    return false;
  }

  // Check if the email contains spaces
  if (email.includes(" ")) {
    return false;
  }

  return true;
}

export function validatePayLink(url: string): URL {
  let urlObj: URL;

  try {
    urlObj = new URL(url);

    if (!urlObj.protocol.startsWith("https")) {
      throw new Error("URL must use HTTPS Protocol");
    }

    if (urlObj.searchParams.get("hash") === null) {
      throw new Error("Missing salt query parameter");
    }

    return urlObj;
  } catch (error: unknown) {
    if (error instanceof PaymentException) {
      throw new PaymentException(error.message);
    } else {
      throw new Error("Failed to parse URL");
    }
  }
}

// simple payment params validation for prevent unnecessary api calls
export function validatePaymentParams(
  basicParams: BasicPaymentParams
): BasicPaymentParams {
  if (
    typeof basicParams.firstName !== "string" ||
    basicParams.firstName.length < 1
  ) {
    throw new Error("First name must be a non-empty string");
  }

  if (
    typeof basicParams.lastName !== "string" ||
    basicParams.lastName.length < 1
  ) {
    throw new Error("Last name must be a non-empty string");
  }

  if (
    typeof basicParams.email !== "string" ||
    !isValidEmail(basicParams.email)
  ) {
    throw new Error("Email must be a valid email address");
  }

  if (typeof basicParams.phone !== "string") {
    throw new Error("Phone number must be a string");
  }

  if (typeof basicParams.amount !== "number" || basicParams.amount < 100) {
    throw new Error("Amount must be a number greater than or equal to 100");
  }

  if (
    typeof basicParams.reference !== "string" ||
    basicParams.reference.length < 10 ||
    basicParams.reference.length > 20
  ) {
    throw new Error(
      "Reference must be a string with a length between 10 and 20 characters"
    );
  }

  if (
    typeof basicParams.transactionRedirectUrl !== "string" ||
    !isValidUrl(basicParams.transactionRedirectUrl)
  ) {
    throw new Error("Transaction redirect URL is not valid");
  }

  return basicParams;
}
