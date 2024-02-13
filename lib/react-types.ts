import { ConsumerProps } from 'react';

export type BaseFunctionProps = {
  children: React.ReactNode;
};

export type BaseConsumerProps<T> = ConsumerProps<T>;

export type BaseProviderProps = BaseFunctionProps;
