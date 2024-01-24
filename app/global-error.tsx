'use client';

import { AppErrorBoundary, type AppError } from '@/components/error';

/**
 * TODO: 유저 친화적 에러 페이지로 디자인 변경
 */
function GlobalError(props: AppError) {
  return (
    <html>
      <body>
        <AppErrorBoundary className="min-h-screen" {...props} />
      </body>
    </html>
  );
}

export default GlobalError;
