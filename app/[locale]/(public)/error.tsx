'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { AppErrorBoundary, type AppError } from '@/components/error';

function Error(props: AppError) {
  return (
    <QueryErrorResetBoundary>
      {({ reset: resetQuery }) => (
        <AppErrorBoundary
          className="min-h-screen"
          resetQuery={resetQuery}
          {...props}
        />
      )}
    </QueryErrorResetBoundary>
  );
}

export default Error;
