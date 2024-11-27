/**
 * Validates if a given string is a well-formed URL
 * @param url - URL to validate
 * @returns boolean indicating URL validity
 */

export function isValidEmail(email: string) {
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
