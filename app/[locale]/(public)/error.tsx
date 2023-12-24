'use client';

import ErrorContainer, {
  type ErrorContainerProps,
} from '@/components/ErrorContainer';

function LocalError(props: ErrorContainerProps) {
  return <ErrorContainer {...props} />;
}

export default LocalError;
