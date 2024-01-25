import BitConsumer from './BitConsumer';
import BitOverlay from './BitOverlay';
import BitProvider from './BitProvider';
import BitView from './BitView';

const Bit = Object.freeze({
  Provider: BitProvider,
  Consumer: BitConsumer,
  View: BitView,
  Overlay: BitOverlay,
});

export default Bit;
