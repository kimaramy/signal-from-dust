'use client';

import type { BitContextValue } from '../context';
import { useBitContext } from '../hooks';

interface BitConsumerProps {
  children: (bitContext: BitContextValue) => React.ReactNode;
}

function BitConsumer({ children }: BitConsumerProps) {
  const bitsContext = useBitContext();
  return <>{children(bitsContext)}</>;
}

export default BitConsumer;
