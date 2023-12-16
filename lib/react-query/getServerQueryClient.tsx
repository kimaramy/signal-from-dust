import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

const getServerQueryClient = cache(() => new QueryClient());

export default getServerQueryClient;
