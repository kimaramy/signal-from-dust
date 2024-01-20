'use client';

import ErrorContainer, {
  type ErrorContainerProps,
} from '@/components/error/ErrorContainer';

function Error(props: ErrorContainerProps) {
  return <ErrorContainer className="min-h-screen" {...props} />;
}

export default Error;
