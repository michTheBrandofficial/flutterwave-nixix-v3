import { callStore } from "nixix";

const loadedScripts: {
  src?: string;
} = {};

interface ScriptStatusInterface {
  loaded: boolean;
  error: boolean;
}

const scriptStatusInterface: ScriptStatusInterface = {
  loaded: false,
  error: false,
}

const src = 'https://checkout.flutterwave.com/v3.js';

export default function useFWScript() {
  const [state, setState] = callStore(scriptStatusInterface);

  (function (): ((() => void) | void)  {
    if (loadedScripts.hasOwnProperty(src)) {
      setState({
        loaded: true,
        error: false,
      });
    } else {
      loadedScripts.src = src;
      
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      const onScriptLoad = (): void => {
        setState({
          loaded: true,
          error: false,
        });
      };
      
      const onScriptError = (): void => {
        delete loadedScripts.src;

        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('complete', onScriptLoad);
      script.addEventListener('error', onScriptError);

      document.body.appendChild(script);
    }
  })();

  return state;
}
