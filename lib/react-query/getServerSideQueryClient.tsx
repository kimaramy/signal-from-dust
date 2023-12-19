import { cache } from 'react';
import { QueryClient } from '@tanstack/react-query';

const getServerSideQueryClient = cache(() => new QueryClient());

export default getServerSideQueryClient;
