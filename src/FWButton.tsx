import callFlutterwave from './callFW';
import { type NixixNode } from 'nixix';
import { type FlutterwaveConfig, type FlutterWaveResponse } from './types';

interface FlutterWaveButtonProps extends FlutterwaveConfig {
  text?: string;
  className?: string;
  disabled?: boolean;
  onClose: () => void;
  children?: NixixNode<any>;
  callback: (response: FlutterWaveResponse) => void;
}

const FlutterWaveButton = ({
  text,
  className,
  children,
  callback,
  onClose,
  disabled,
  ...config
}: FlutterWaveButtonProps): JSX.Element => {
  const handleFlutterwavePayment = callFlutterwave(config);

  return (
    <>
      {disabled === true ? (
        <button
          className={className ? className:'fwbutton'}
          disabled={true}
          on:click={() => handleFlutterwavePayment({ callback, onClose })}
        >
          {text || children}
        </button>
      ) : (
        <button
          className={className ? className:'fwbutton'}
          on:click={() => {
            console.log('tried');
            handleFlutterwavePayment({ callback, onClose });
          }}
        >
          {text || children}
        </button>
      )}
    </>
  );
};

export default FlutterWaveButton;
