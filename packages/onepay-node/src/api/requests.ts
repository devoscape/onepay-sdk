import https, { RequestOptions } from "node:https";
import { OnepayPaymentParams, PaymentResponse } from "../interfaces";
import { validatePayLink } from "../validation";

async function paymentRequest(
  url: string,
  token: string,
  body: OnepayPaymentParams
): Promise<PaymentResponse> {
  if (!url && !token && !body) {
    throw new Error("Missing required parameters");
  }

  const urlObj = validatePayLink(url);

  const hashParam = urlObj.searchParams.get("hash");

  const TIMEOUT_MS = 30000;

  const options: RequestOptions = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + `?hash=${hashParam}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    timeout: TIMEOUT_MS,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks: Buffer[] = [];

      res.setTimeout(TIMEOUT_MS, () => {
        req.destroy(new Error("Response timeout"));
      });

      res.on("data", (chunk) => {
        chunks.push(Buffer.from(chunk));
      });

      res.on("end", () => {
        try {
          const data = Buffer.concat(chunks).toString("utf8");

          const response: PaymentResponse = JSON.parse(data);

          //   if (!response.status || !response.message || !response.data) {
          //     throw new Error("Invalid response format");
          //   }

          if (res.statusCode === 200 && response.status === 1000) {
            resolve({
              status: response.status,
              message: response.message,
              data: response.data,
            });
          } else {
            const error: Error = new Error(data);
            reject(error);
          }
        } catch (err) {
          const error: Error = new Error("Failed to Process response");
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(JSON.stringify(body));

    req.end();
  });
}

export { paymentRequest };
