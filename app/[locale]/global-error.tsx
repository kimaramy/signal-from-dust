'use client';

import ErrorContainer, {
  type ErrorContainerProps,
} from '@/components/ErrorContainer';

/**
 * TODO: 유저 친화적 에러 페이지로 디자인 변경
 */
export default function GlobalError(props: ErrorContainerProps) {
  return (
    <html>
      <body>
        <ErrorContainer {...props} />
      </body>
    </html>
  );
}
