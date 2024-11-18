<p align="center">
   <img alt="Koshima logo" src="https://www.onepay.lk/assets/Images/Onepay-PG-Logo.png" width=300 >
  </a>
</p>

<h1 align="center">OnePay-SDK</h1>

A lightweight Node.js SDK to integrate payment gateway functionalities with zero dependencies and full TypeScript support.

This package provides various payment-related utilities such as generating payment URLs and other utility functions to assist with your payment gateway integration. Callback validation functionality is planned for a future release.

## Features

- **Lightweight**: Focused purely on generating payment links.
- **Zero dependencies**: The package has no external dependencies.
- **TypeScript support**: Built-in TypeScript types for a seamless experience.
- **Flexible payment URL generation**: Easily generate payment URLs with custom parameters.
- **Callback validation (coming soon)**: Planned functionality to validate incoming callback data from the payment gateway.
- **Error handling**: Catch and handle errors effectively during payment processing.

## Installation

To install the package, run the following command:

```bash
npm install @onepay-payment-sdk/server
```

## Usage

- Require "@onepay-payment-sdk/server" in your file

  ```js
  const { Onepay } = require("@onepay-payment-sdk/server");
  ```

- Create onepay config option, with parameters.

  ```js
  const onepay = new Onepay();

  const paymentDetails = onepay.generatePaymentParams({
    amount: 100,
    email: "onepay@example.com",
    firstName: "john",
    lastName: "doe",
    phone: "+94701234567",
    reference: "581231123121311231",
    transactionRedirectUrl: "http://localhost:3000/checkout",
  });

  const response = await onepay.createPaymentRequest(data);

  console.log(response.data.gateway.redirect_url);
  ```

## License

This package is licensed under the MIT License. See [LICENSE](/LICENSE) for more information.
