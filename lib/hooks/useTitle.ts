import { useLayoutEffect, useState } from 'react';

function useTitle() {
  const [title, setTitle] = useState('');

  useLayoutEffect(() => {
    setTitle(document.title);
  }, []);

  return title;
}

export default useTitle;
