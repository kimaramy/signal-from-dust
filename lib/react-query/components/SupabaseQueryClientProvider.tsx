'use client';

import { useState } from 'react';
import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getSupabaseQueryClient } from '../utils';

interface QueryClientProviderProps {
  children: React.ReactNode;
}

function SupabaseQueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(getSupabaseQueryClient());

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </ReactQueryClientProvider>
  );
}

export default SupabaseQueryClientProvider;
