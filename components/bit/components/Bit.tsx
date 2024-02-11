import { BitConsumer, BitProvider } from '../lib';
import BitOverlay from './BitOverlay';
import BitView from './BitView';

const Bit = Object.freeze({
  Provider: BitProvider,
  Consumer: BitConsumer,
  View: BitView,
  Overlay: BitOverlay,
});

export default Bit;
