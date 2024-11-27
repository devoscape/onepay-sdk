import { isValidEmail } from "./emailValidator";
import { isValidUrl } from "./urlValidator";
import { BasicPaymentParams } from "../interfaces";

/**
 * Validates payment parameters with comprehensive checks
 * @param basicParams - Payment parameters to validate
 * @returns Validated payment parameters
 * @throws Error for invalid parameters
 */
export function validatePaymentParams(
  basicParams: BasicPaymentParams,
): BasicPaymentParams {
  if (!basicParams || typeof basicParams !== "object") {
    throw new Error("Payment parameters must be an object");
  }

  // first name validation
  if (
    !basicParams.firstName ||
    typeof basicParams.firstName !== "string" ||
    basicParams.firstName.trim().length < 1
  ) {
    throw new Error("First name must be a non-empty string");
  }

  // last name validation
  if (
    !basicParams.lastName ||
    typeof basicParams.lastName !== "string" ||
    basicParams.lastName.trim().length < 1
  ) {
    throw new Error("Last name must be a non-empty string");
  }

  // email validation
  if (!basicParams.email || !isValidEmail(basicParams.email.trim())) {
    throw new Error("Email must be a valid email address");
  }

  // phone number validation
  if (!basicParams.phone || typeof basicParams.phone !== "string") {
    throw new Error("Phone number must be a string");
  }

  // amount validation
  if (
    typeof basicParams.amount !== "number" ||
    isNaN(basicParams.amount) ||
    basicParams.amount < 100
  ) {
    throw new Error("Amount must be a number greater than or equal to 100");
  }

  // reference validation
  if (
    !basicParams.reference ||
    typeof basicParams.reference !== "string" ||
    basicParams.reference.trim().length < 10 ||
    basicParams.reference.trim().length > 20
  ) {
    throw new Error("Reference must be 10-20 characters long");
  }

  // transaction redirect URL validation
  if (
    !basicParams.transactionRedirectUrl ||
    typeof basicParams.transactionRedirectUrl !== "string" ||
    !isValidUrl(basicParams.transactionRedirectUrl)
  ) {
    throw new Error("Invalid transaction redirect URL");
  }

  return {
    firstName: basicParams.firstName.trim(),
    lastName: basicParams.lastName.trim(),
    email: basicParams.email.trim(),
    phone: basicParams.phone.trim(),
    amount: Number(basicParams.amount.toFixed(2)),
    reference: basicParams.reference.trim(),
    transactionRedirectUrl: basicParams.transactionRedirectUrl.trim(),
  };
}
