import { ConsumerProps } from 'react';

export type BaseFunctionProps = {
  children: React.ReactNode;
};

export type BaseConsumerProps<T> = ConsumerProps<T>;

export type BaseProviderProps = BaseFunctionProps;

export type HTMLAttributes<T = HTMLDivElement> = React.HTMLAttributes<T>;

export type HTMLAttributesWithoutChildren<T = HTMLDivElement> = Omit<
  React.HTMLAttributes<T>,
  'children'
>;
