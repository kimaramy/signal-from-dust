import { useContext } from 'react';

import { BitContext } from './context';

function useBitContext() {
  const bitContext = useContext(BitContext);
  if (!bitContext) {
    throw new Error(
      `useBitContext must be called within a BitContext.Provider`
    );
  }
  return bitContext;
}

export { useBitContext };
