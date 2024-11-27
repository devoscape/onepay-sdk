import { isValidUrl } from "./url-validator";

import { PaymentException } from "../exceptions/";

/**
 * Validates payment link URL with strict requirements
 * @param url - URL to validate
 * @returns Validated URL object
 * @throws PaymentException for invalid URLs
 */
export function validatePayLink(url: string): URL {
  if (!isValidUrl(url)) {
    throw new PaymentException("Invalid URL format");
  }

  try {
    const urlObj = new URL(url);

    if (!urlObj.protocol.startsWith("https")) {
      throw new PaymentException("URL must use HTTPS Protocol");
    }

    if (!urlObj.searchParams.get("hash")) {
      throw new PaymentException("Missing salt query parameter");
    }

    return urlObj;
  } catch (error: unknown) {
    throw new PaymentException(
      error instanceof Error ? error.message : "Failed to parse URL",
    );
  }
}
