import { callFlutterwave } from '../../dist/index';
import { type InitializeFlutterwavePayment, type FlutterwaveConfig } from '../../dist/types';

/*
  
  Please add this script to the head element in your index.html:
  <script defer src="https://checkout.flutterwave.com/v3.js"></script>

*/

const config: FlutterwaveConfig & InitializeFlutterwavePayment = {
  public_key: "FLWPUBK_TEST-************************-X",
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
    console.log(`${data.customer.email} just paid me.`)
  },
  customizations: {
    title: 'My store',
    description: 'Payment for items in cart',
    logo: 'https://assets.piedpiper.com/logo.png',
  },
};

export default function App() {
  function makeOrders() {
    const handlePayment = callFlutterwave(config);
    handlePayment({ callback: config.callback, onClose: config.onClose });
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <button on:click={makeOrders} >Pay 100 Naira</button>
    </div>
  );
}