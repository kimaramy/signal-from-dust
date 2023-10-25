import { useCallback, useState } from 'react';

export default function useRerender() {
  const [_emptyObj, setEmptyObj] = useState(Object.create(null));
  const rerender = useCallback(() => setEmptyObj(Object.create(null)), []);
  return rerender;
}
