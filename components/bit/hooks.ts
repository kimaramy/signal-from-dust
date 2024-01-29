import { useContext } from 'react';

import { BitContext, type BitContextValue } from './context';

function useBitContext<T extends boolean>(
  options = { strict: true as T }
): T extends true ? BitContextValue : BitContextValue | null {
  const bitContext = useContext(BitContext);
  if (options?.strict && !bitContext) {
    throw new Error(
      `useBitContext must be called within a BitContext.Provider`
    );
  }
  return bitContext as any;
}

export { useBitContext };
