<p align="center">
    <img title="Flutterwave" height="200" src="https://flutterwave.com/images/logo/full.svg" width="50%"/>
</p>

# Flutterwave v3 Nixix Library

## Introduction

The Nixix SDK helps you create seamless payment experiences in your Nixix mobile or web app. By connecting to our modal, you can start collecting payment in no time.

Available features include:

- Collections: Card, Account, Mobile money, Bank Transfers, USSD, Barter, NQR.
- Recurring payments: Tokenization and Subscriptions.
- Split payments

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Initialization](#initialization)
4. [Usage](#usage)
5. [Support](#support)
6. [Contribution Guidelines](#contribution-guidelines)
7. [License](#license)
8. [Contributors](#contributors)
9. [Changelog](#)

## Requirements

1. Flutterwave version 3 API keys
2. Node version >= 6.9.x and npm >= 3.x.x
3. Nixix version >= 1.3.0

## Installation

Install the SDK

```bash
$ npm install flutterwave-nixix-v3


```

## Initialization

Add this script to your head element of your index.html: <script defer src="https://checkout.flutterwave.com/v3.js"></script>


Import callFlutterwave to any component in your application and pass your config

```typescript
import { callFlutterwave, FlutterWaveTypes } from 'flutterwave-nixix-v3';

interface FlutterWaveConfig extends FlutterWaveTypes.FlutterwaveConfig, FlutterWaveTypes.InitializeFlutterwavePayment {}

const config: FlutterWaveConfig = {
  public_key: 'FLWPUBK_TEST-************************-X',
  tx_ref: Date.now().toString(), //  can be a random lengthy string.
  amount: 100,
  currency: 'NGN', // can be 'USD' or any other currency
  payment_options: 'card,ussd',
  customer: {
    email: 'user@gmail.com', // user's email
    phone_number: '08102909304', // user's phone number
    name: 'test user', // user's name
  },
  onClose: () => {
    console.log('Payment modal is closed!!');
  },
  callback: (data) => {
    console.log(`${data.customer.email} just paid me.`);
  },
  customizations: {
    title: 'My store',
    description: 'Payment for items in cart',
    logo: 'https://assets.piedpiper.com/logo.png',
  },
};
```

## Usage

Add Flutterwave to your projects as a nixix api:

1. [Directly in your code](#hooks)
2. [Making recurrent payments](#recurring-payments)

### Hooks

```javascript
import { callFlutterwave, closePaymentModal, FlutterWaveTypes } from 'flutterwave-nixix-v3';

interface FlutterWaveConfig extends FlutterWaveTypes.FlutterwaveConfig, FlutterWaveTypes.InitializeFlutterwavePayment {}

const config: FlutterWaveConfig = {
  public_key: 'FLWPUBK-**************************-X',
  tx_ref: Date.now(),
  amount: 100,
  currency: 'NGN',
  payment_options: 'card,mobilemoney,ussd',
  customer: {
    email: 'user@gmail.com',
    phone_number: '070********',
    name: 'john doe',
  },
  onClose: () => {
    console.log('Payment modal is closed!!');
  },
  callback: (data) => {
    console.log(`${data.customer.email} just paid me.`);
  },
  customizations: {
    title: 'my Payment Title',
    description: 'Payment for items in cart',
    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  },
};

export default function App() {
  function makeOrders() {
    const handlePayment = callFlutterwave(config);
    handlePayment({ callback: config.callback, onClose: config.onClose });
    closePaymentModal();
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button on:click={makeOrders}>Pay 100 Naira</button>
    </div>
  );
}
```

### Recurring Payments

Pass the payment plan ID into your payload to make [recurring payments](https://developer.flutterwave.com/docs/recurring-payments/payment-plans).

```javascript
import { callFlutterwave } from 'flutterwave-nixix-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK-**************************-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options:"card",
    payment_plan:"3341",
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    meta: { counsumer_id: "7898", consumer_mac: "kjs9s8ss7dd" },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  function makeOrders() {
    const handlePayment = callFlutterwave(config);
    handlePayment({ callback: config.callback, onClose: config.onClose });
    closePaymentModal();
  }

  return (
    <div className="App">
     <h1>Hello Test user</h1>

      <button
        on:click={makeOrders}
      >
        Payment with Nixix apis
      </button>
    </div>
  );
}
```

### Parameters

Read more about our parameters and how they can be used [here](https://developer.flutterwave.com/docs/collecting-payments/inline).

| Parameter           | Always Required ? | Description                                                                                                                                                                                                                             |
| ------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public_key          | True              | Your API public key                                                                                                                                                                                                                     |
| tx_ref              | True              | Your transaction reference. This MUST be unique for every transaction                                                                                                                                                                   |
| amount              | True              | Amount to charge the customer.                                                                                                                                                                                                          |
| currency            | False             | currency to charge in. Defaults to NGN                                                                                                                                                                                                  |
| integrity_hash      | False             | This is a sha256 hash of your FlutterwaveCheckout values, it is used for passing secured values to the payment gateway.                                                                                                                 |
| payment_options     | True              | This specifies the payment options to be displayed e.g - card, mobilemoney, ussd and so on.                                                                                                                                             |
| payment_plan        | False             | This is the payment plan ID used for Recurring billing                                                                                                                                                                                  |
| redirect_url        | False             | URL to redirect to when a transaction is completed. This is useful for 3DSecure payments so we can redirect your customer back to a custom page you want to show them.                                                                  |
| customer            | True              | This is an object that can contains your customer details: e.g - 'customer': {'email': 'example@example.com','phone_number': '08012345678','name': 'Takeshi Kovacs' }                                                                   |
| subaccounts         | False             | This is an array of objects containing the subaccount IDs to split the payment into. Check our Split Payment page for more info                                                                                                         |
| meta                | False             | This is an object that helps you include additional payment information to your request e.g {'consumer_id': 23,'consumer_mac': '92a3-912ba-1192a' }                                                                                     |
| customizations      | True              | This is an object that contains title, logo, and description you want to display on the modal e.g{'title': 'Pied Piper Payments','description': 'Middleout isn't free. Pay the price','logo': 'https://assets.piedpiper.com/logo.png' } |
| callback (function) | False             | This is the function that runs after payment is completed                                                                                                                                                                               |
| close (function)    | False             | This is the function that runs after payment modal is closed                                                                                                                                                                            |

## Other methods and descriptions:

Methods provided by the Nixix SDK:

| Method Name       | Parameters | Returns | Description                                                  |
| ----------------- | ---------- | ------- | ------------------------------------------------------------ |
| closePaymentModal | Null       | Null    | This methods allows you to close the payment modal via code. |

Please checkout [Flutterwave Documentation](https://developer.flutterwave.com/docs/flutterwave-standard) for other available options you can add to the tag.

## Debugging Errors

We understand that you may run into some errors while integrating our library. You can read more about our error messages [here](https://developer.flutterwave.com/docs/integration-guides/errors).

For `authorization` and `validation` error responses, double-check your API keys and request. If you get a `server` error, kindly engage the team for support.

# Support

For additional assistance using this library, please create an issue on the Github repo or contact the developer experience (DX) team via [email](mailto:developers@flutterwavego.com) or on [slack](https://bit.ly/34Vkzcg).

You can also follow us [@FlutterwaveEng](https://twitter.com/FlutterwaveEng) and let us know what you think 😊.

## Contribution Guidelines

We welcome contributions from the community. Read more about our community contribution guidelines [here](/CONTRIBUTING.md).

<a id="license"></a>

## License

By contributing to this library, you agree that your contributions will be licensed under its [MIT license](/LICENSE.md).

Copyright (c) Flutterwave Inc.

## Contributors

- [Charles Ikechukwu](https://github.com/michTheBrandofficial)
