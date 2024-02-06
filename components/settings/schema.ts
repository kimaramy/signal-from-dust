import { z } from 'zod';

import {
  CustomValueMapSchema,
  LocaleSchema,
  type CustomValueTemplate,
} from '@/lib/model';

const settingsModeSchemaName = 'settingsMode';

const settingsModeKeys = ['preset', 'custom', 'realtime'] as const;

const settingsModeKeySchema = z.enum(settingsModeKeys);

type SettingsModeSchemaName = typeof settingsModeSchemaName;

type SettingsModeKey = z.infer<typeof settingsModeKeySchema>;

type SettingsModeValue = CustomValueTemplate<SettingsModeKey> & {
  isDesktopOnly: boolean;
};

const settingsModeValues: ReadonlyArray<SettingsModeValue> = [
  {
    name: 'preset',
    order: 0,
    isDesktopOnly: false,
    i18n: {
      en: 'Presets',
      ko: '추천 설정',
    },
  },
  {
    name: 'custom',
    order: 1,
    isDesktopOnly: false,
    i18n: {
      en: 'Customs',
      ko: '직접 설정',
    },
  },
  {
    name: 'realtime',
    order: 2,
    isDesktopOnly: true,
    i18n: {
      en: 'Realtime',
      ko: '실시간',
    },
  },
];

const settingsModeMap = new Map(
  settingsModeKeys.map((settingsModeKey) => [
    settingsModeKey,
    settingsModeValues.find((value) => value.name === settingsModeKey)!,
  ])
);

class SettingsModeSchema extends CustomValueMapSchema<
  SettingsModeSchemaName,
  SettingsModeKey,
  SettingsModeValue
> {
  constructor() {
    super(
      settingsModeSchemaName,
      settingsModeMap,
      settingsModeKeySchema,
      settingsModeKeySchema.enum.preset
    );
  }
  display(
    settingsModeKey: SettingsModeKey,
    locale = LocaleSchema.defaultLocale
  ) {
    return this.getValue(settingsModeKey)['i18n'][locale];
  }
  checkDesktopOnly(settingsModeKey: SettingsModeKey) {
    return this.getValue(settingsModeKey).isDesktopOnly === true;
  }
}

const settingsModeSchema = new SettingsModeSchema();

export namespace SettingsModeUtils {
  export type Key = SettingsModeKey;
  export type Value = SettingsModeValue;
  export type SchemaName = SettingsModeSchemaName;
  export const schema = settingsModeSchema;
}
