'use client';

import ErrorContainer, {
  type ErrorContainerProps,
} from '@/components/error/ErrorContainer';

function Error(props: ErrorContainerProps) {
  return <ErrorContainer {...props} />;
}

export default Error;
