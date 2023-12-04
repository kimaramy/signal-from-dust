import { useCallback } from 'react';

import type { TypedRoute } from '../type';
import useDecoratedRouter from './_useDecoratedRouter';

interface NavigateOptions {
  method?: 'push' | 'replace';
  scroll?: boolean;
}

function useNavigate() {
  const router = useDecoratedRouter();

  const navigate = useCallback(
    (href: TypedRoute, options?: NavigateOptions) => {
      const method = options?.method ?? 'push';
      const scroll = options?.scroll ?? false;

      const url = new URL(href, 'http://localhost');

      const validSearch = url.search.startsWith('?')
        ? url.search.indexOf('?') !== url.search.lastIndexOf('?')
          ? url.search.slice(url.search.lastIndexOf('?'))
          : url.search
        : '';

      url.search = validSearch;

      router[method](href, { scroll });
    },
    [router]
  );

  return navigate;
}

export default useNavigate;
