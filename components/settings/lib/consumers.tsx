import type { BaseConsumerProps } from '@/lib/react-types';

import {
  SettingsContext,
  SettingsContextError,
  type SettingsContextValues,
} from './contexts';

function SettingsConsumer({
  children,
}: BaseConsumerProps<SettingsContextValues>) {
  return (
    <SettingsContext.Consumer>
      {(settingsContext) => {
        if (!settingsContext) {
          throw SettingsContextError(SettingsConsumer.name);
        }
        return children(settingsContext);
      }}
    </SettingsContext.Consumer>
  );
}

export { SettingsConsumer };
