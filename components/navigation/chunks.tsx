import dynamic from 'next/dynamic';

import { Skeleton } from '@/components/ui/skeleton';

export const Menu = dynamic(() => import('./components/Menu.chunk'), {
  ssr: false,
  loading: () => <Skeleton className="h-9 flex-none" />,
});
