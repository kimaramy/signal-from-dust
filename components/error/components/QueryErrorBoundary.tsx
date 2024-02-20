'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorSchema, type PostgrestError } from '@/lib/model';

import AppErrorBoundary from './AppErrorBoundary';

/**
 * error.tsx 파일에 세그먼트(페이지)에서 발생한 리액트 쿼리 에러를 위임하지 않고 내부 컴포넌트에서 사용할 경우 사용
 */
function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            onReset={() => reset()}
            fallbackRender={({ error, resetErrorBoundary }) => {
              let serializedError = JSON.stringify(error, null, 2);

              const isPostgrestError = ErrorSchema.isPostgrestError(error);

              if (isPostgrestError) {
                const { code, message } = error as PostgrestError;
                serializedError = `[${code}] ${message}}`;
              }

              return (
                <AppErrorBoundary
                  error={serializedError}
                  reset={resetErrorBoundary}
                />
              );
            }}
          >
            {children}
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
}

export default QueryErrorBoundary;
