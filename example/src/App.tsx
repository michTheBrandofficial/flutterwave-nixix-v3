import { FlutterWaveButton, closePaymentModal } from '../../src/index';
import { type InitializeFlutterwavePayment, type FlutterwaveConfig } from '../../src/types';


export default function App() {
  const config: FlutterwaveConfig = {
    public_key: "FLWPUBK-**************************-X",
    tx_ref: Date.now().toString(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '08102909304',
      name: 'test user',
    },

    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://assets.piedpiper.com/logo.png',
    },
  };
  

  const fwConfig: FlutterwaveConfig & InitializeFlutterwavePayment = {
    ...config,
    text: 'Pay with Flutterwave btn',
    callback: (response) => {
      console.log(response);
      closePaymentModal()
    },
    onClose: () => {
      console.log("You close me ooo")
    },
    
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}