'use client';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorCode from '@/components/ErrorCode';

type RuntimeErrorBoundaryProps = {
  children: React.ReactNode;
};

function RuntimeErrorBoundary({ children }: RuntimeErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <ErrorCode text={JSON.stringify(error, null, 2)} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export default RuntimeErrorBoundary;
