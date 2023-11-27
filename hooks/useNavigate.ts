import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface NavigateOptions {
  method?: 'push' | 'replace';
  scroll?: boolean;
}

function useNavigate() {
  const router = useRouter();

  const navigate = useCallback(
    (
      pathname: string,
      search: string | null = null,
      options?: NavigateOptions
    ) => {
      const method = options?.method ?? 'push';
      const scroll = options?.scroll ?? false;

      const searchWithPrefix = search
        ? search.startsWith('?')
          ? search
          : `?${search}`
        : '';

      router[method](pathname + searchWithPrefix, { scroll });
    },
    [router]
  );

  return navigate;
}

export default useNavigate;
