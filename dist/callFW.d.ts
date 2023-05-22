import { type InitializeFlutterwavePayment, type FlutterwaveConfig } from './types';
export default function callFlutterwave(flutterWaveConfig: FlutterwaveConfig): ({ callback, onClose, }: InitializeFlutterwavePayment) => any;
