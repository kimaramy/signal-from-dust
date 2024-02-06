import type { ConsumerProps } from 'react';

import {
  SettingsContext,
  SettingsContextError,
  type SettingsContextValues,
} from './context';

function SettingsConsumer({ children }: ConsumerProps<SettingsContextValues>) {
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

export default SettingsConsumer;
